import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { sendMail, emailTemplates } from "@/lib/email";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status, commissionAmount, note } = body;

        const student = await (prisma as any).student.update({
            where: { id: params.id },
            data: { status },
            include: { partner: true }
        });

        if (status === 'admitted' && commissionAmount && Number(commissionAmount) > 0) {
            await (prisma as any).earning.create({
                data: {
                    partnerId: student.partnerId,
                    studentId: student.id,
                    amount: Number(commissionAmount),
                    type: "Admission Commission",
                    note: note || `Reward for student ${student.studentName} admission`,
                    status: "pending"
                }
            });

            await (prisma as any).partner.update({
                where: { id: student.partnerId },
                data: {
                    totalEarnings: { increment: Number(commissionAmount) },
                    pendingEarnings: { increment: Number(commissionAmount) }
                }
            });

            sendMail({
                to: student.partner.email,
                ...emailTemplates.earningAdded(Number(commissionAmount), 'Admission Reward')
            }).catch((e: any) => console.error("Reward email error:", e));
        }

        sendMail({
            to: student.partner.email,
            ...emailTemplates.statusChanged(student.studentName, status)
        }).catch((e: any) => console.error("Status update email error:", e));

        return NextResponse.json({ message: "Student and partner rewards updated successfully" });

    } catch (error: any) {
        console.error("Student status update error:", error);
        return NextResponse.json({ message: "Error updating student status" }, { status: 500 });
    }
}
