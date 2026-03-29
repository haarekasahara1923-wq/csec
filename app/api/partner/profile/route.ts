import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { fullName, mobile, whatsapp, city, country, organization } = body;

        const updatedPartner = await prisma.partner.update({
            where: { id: user.id as string },
            data: {
                fullName,
                mobile,
                whatsapp,
                city,
                country,
                organization,
            }
        });

        return NextResponse.json({ message: "Profile updated successfully", partner: updatedPartner });
    } catch (error) {
        return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
    }
}
