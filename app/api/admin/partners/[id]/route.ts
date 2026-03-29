import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { sendMail, emailTemplates } from "@/lib/email";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status } = body;

        const partner = await prisma.partner.update({
            where: { id: params.id },
            data: { status }
        });

        // Notify Partner
        if (status === 'active') {
             sendMail({
                to: partner.email,
                ...emailTemplates.welcome(partner.fullName, partner.affiliateLink, `${process.env.NEXTAUTH_URL}/partner/login`)
            }).catch(e => console.error("Email error:", e));
        }

        return NextResponse.json({ message: "Status updated", partner });
    } catch (error) {
        return NextResponse.json({ message: "Error updating status" }, { status: 500 });
    }
}
