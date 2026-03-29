import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status } = body;

        const earning = await (prisma as any).earning.findUnique({
            where: { id: params.id }
        });

        if (!earning) {
            return NextResponse.json({ message: "Earning record not found" }, { status: 404 });
        }

        if (status === 'paid' && earning.status !== 'paid') {
            await prisma.$transaction([
                (prisma as any).earning.update({
                    where: { id: params.id },
                    data: { status: 'paid' }
                }),
                (prisma as any).partner.update({
                    where: { id: earning.partnerId },
                    data: {
                        pendingEarnings: { decrement: earning.amount },
                        paidEarnings: { increment: earning.amount }
                    }
                })
            ]);
        }

        return NextResponse.json({ message: "Payment status updated successfully" });

    } catch (error: any) {
        console.error("Payment update error:", error);
        return NextResponse.json({ message: "Error updating payment" }, { status: 500 });
    }
}
