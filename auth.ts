import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;
                const loginType = (credentials as any).loginType;

                if (loginType === "partner") {
                    const partner = await prisma.partner.findUnique({
                        where: { email },
                    });

                    if (partner && partner.passwordHash) {
                        const isMatch = await bcrypt.compare(password, partner.passwordHash);
                        if (isMatch) {
                            return {
                                id: partner.id,
                                email: partner.email,
                                name: partner.fullName,
                                role: "PARTNER",
                            };
                        }
                    }
                } else {
                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (user && user.password) {
                        const isMatch = await bcrypt.compare(password, user.password);
                        if (isMatch) {
                            return {
                                id: user.id,
                                email: user.email,
                                role: user.role || "ADMIN",
                            };
                        }
                    }
                }
                
                return null;
            },
        }),
    ],
});

