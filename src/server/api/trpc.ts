import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = await auth();

    // Mock session for No-Auth mode
    const finalSession = session ?? {
        user: {
            id: "dummy-user-id",
            name: "Guest User",
            email: "guest@example.com",
            image: "",
            credits: 9999,
        },
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return {
        db,
        session: finalSession,
        ...opts,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});

export const protectedProcedure = t.procedure.use(isAuthed);
