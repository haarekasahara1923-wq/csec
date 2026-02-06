"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export function PublicLayoutWrapper({
    children,
    settings
}: {
    children: React.ReactNode;
    settings: any;
}) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar settings={settings} />
            <main>{children}</main>
            <Footer settings={settings} />
            <WhatsAppWidget settings={settings} />
        </>
    );
}
