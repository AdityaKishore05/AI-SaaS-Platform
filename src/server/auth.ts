import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "@/server/db";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            credits: number;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(db), // Removed for No-Auth mode
    secret: process.env.NEXTAUTH_SECRET ?? "dummy-secret-for-dev",
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "dummy-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "dummy-client-secret",
        }),
    ],
    callbacks: {
        session: ({ session, user }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                    credits: (user as any).credits ?? 0,
                },
            };
        },
        redirect: async ({ url, baseUrl }) => {
            return `${baseUrl}/dashboard`;
        },
    },
});
