import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", className)}>
        {children}
    </div>
);

export const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn("px-6 py-4 border-b border-gray-50", className)}>{children}</div>
);

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <h3 className={cn("text-lg font-bold text-primary", className)}>{children}</h3>
);

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn("p-6", className)}>{children}</div>
);

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn("px-6 py-4 bg-gray-50 border-t border-gray-100", className)}>{children}</div>
);
