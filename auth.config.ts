import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userRole = (auth?.user as any)?.role || "ADMIN"; // Default to admin for existing logic
            
            const isAdminPage = nextUrl.pathname.startsWith("/admin");
            const isPartnerPage = nextUrl.pathname.startsWith("/partner/dashboard");
            const isPartnerAuthPage = nextUrl.pathname === "/partner/login" || nextUrl.pathname === "/partner/register";

            // Guard Admin Pages
            if (isAdminPage) {
                if (nextUrl.pathname === "/admin/login") return true;
                if (isLoggedIn && userRole === "ADMIN") return true;
                return Response.redirect(new URL("/admin/login", nextUrl));
            }

            // Guard Partner Pages
            if (isPartnerPage) {
                if (isLoggedIn && userRole === "PARTNER") return true;
                return Response.redirect(new URL("/partner/login", nextUrl));
            }

            // Redirect logged-in users away from auth pages
            if (isPartnerAuthPage && isLoggedIn) {
                if (userRole === "PARTNER") return Response.redirect(new URL("/partner/dashboard", nextUrl));
                if (userRole === "ADMIN") return Response.redirect(new URL("/admin", nextUrl));
            }

            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "ADMIN";
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;

