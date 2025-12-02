import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
    getStats: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;

        const [generationsCount, recentGenerations] = await Promise.all([
            db.generation.count({
                where: { userId },
            }),
            db.generation.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
        ]);

        return {
            credits: 9999, // Unlimited for Guest
            generationsCount,
            recentGenerations,
        };
    }),

    getHistory: protectedProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(20),
                cursor: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit;
            const { cursor } = input;
            const userId = ctx.session.user.id;

            const items = await db.generation.findMany({
                take: limit + 1, // get an extra item at the end which we'll use as next cursor
                where: { userId },
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: { createdAt: "desc" },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem!.id;
            }

            return {
                items,
                nextCursor,
            };
        }),
});
