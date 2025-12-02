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
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
