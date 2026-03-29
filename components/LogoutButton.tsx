"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/partner/login" })}
            className={cn("cursor-pointer", className)}
        >
            {children}
        </button>
    );
};
