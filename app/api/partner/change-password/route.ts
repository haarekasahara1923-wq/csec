import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { currentPassword, newPassword } = body;

        const partner = await prisma.partner.findUnique({
            where: { id: session.user.id },
            select: { passwordHash: true }
        });

        if (!partner || !partner.passwordHash) {
            return NextResponse.json({ message: "Network error" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, partner.passwordHash);
        if (!isMatch) {
            return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 12);

        await prisma.partner.update({
            where: { id: session.user.id },
            data: { passwordHash: newPasswordHash }
        });

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error updating password" }, { status: 500 });
    }
}
