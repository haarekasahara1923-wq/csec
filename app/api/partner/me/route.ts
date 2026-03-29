import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const partner = await prisma.partner.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                fullName: true,
                email: true,
                mobile: true,
                whatsapp: true,
                affiliateCode: true,
                affiliateLink: true,
                status: true,
                country: true,
                city: true,
                organization: true,
                totalEarnings: true,
                pendingEarnings: true,
                paidEarnings: true,
                createdAt: true,
            }
        });

        if (!partner) {
            return NextResponse.json({ message: "Partner not found" }, { status: 404 });
        }

        return NextResponse.json(partner);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
    }
}
