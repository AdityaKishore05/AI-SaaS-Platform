
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { geminiModel } from "@/server/gemini";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const aiRouter = createTRPCRouter({
    generateText: protectedProcedure
        .input(
            z.object({
                prompt: z.string().min(1),
                type: z.enum([
                    "BLOG",
                    "SOCIAL",
                    "EMAIL",
                    "PRODUCT",
                    "SEO",
                    "VIDEO_SCRIPT",
                    "VIDEO_CAPTION",
                    "IMAGE_PROMPT",
                    "RESEARCH_OUTLINE",
                    "SUMMARY",
                    "SEO_OPTIMIZER",
                    "AD_COPY",
                    "TRANSLATION",
                    "REPURPOSE",
                    "STORY"
                ]),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const { prompt, type } = input;

            // 1. Check credits (Bypassed for Free Mode)
            // const user = await db.user.findUnique({
            //   where: { id: userId },
            //   select: { credits: true },
            // });

            // if (!user || user.credits < 1) {
            //   throw new TRPCError({
            //     code: "FORBIDDEN",
            //     message: "Insufficient credits",
            //   });
            // }

            try {
                const systemPrompt = `You are a helpful AI assistant for generating ${type.toLowerCase()} content.`;
                const fullPrompt = `${systemPrompt} \n\nUser Request: ${prompt} `;

                const result = await geminiModel.generateContent(fullPrompt);
                const response = await result.response;
                const output = response.text();

                const cost = 0; // Free with Gemini

                // 3. Log transaction (Disabled temporarily to fix DB lock issue)
                // 3. Log transaction (Disabled to prevent DB locks and restore stability)
                /*
                await db.generation.create({
                    data: {
                        userId,
                        prompt,
                        output,
                        type,
                        model: "gemini-pro",
                        cost,
                    },
                });
                */

                return { output, creditsRemaining: 9999 };
            } catch (error) {
                console.error("Detailed AI Generation Error:", error);
                if (error instanceof Error) {
                    console.error("Error Message:", error.message);
                    console.error("Error Stack:", error.stack);
                }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to generate content. Check server logs for details.",
                    cause: error,
                });
            }
        }),
});
