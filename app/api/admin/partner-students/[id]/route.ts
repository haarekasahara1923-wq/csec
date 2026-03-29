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
        const { status, commissionAmount, note } = body;

        // 1. Update Student status
        const student = await prisma.student.update({
            where: { id: params.id },
            data: { status },
            include: { partner: true }
        });

        // 2. If Admitted and commission is set, create an earning
        if (status === 'admitted' && commissionAmount > 0) {
            await prisma.earning.create({
                data: {
                    partnerId: student.partnerId,
                    studentId: student.id,
                    amount: Number(commissionAmount),
                    type: "Admission Commission",
                    note: note || `Reward for student ${student.studentName} admission`,
                    status: "pending"
                }
            });

            // Update Partner stats
            await prisma.partner.update({
                where: { id: student.partnerId },
                data: {
                    totalEarnings: { increment: Number(commissionAmount) },
                    pendingEarnings: { increment: Number(commissionAmount) }
                }
            });

            // Notify Partner about reward
            sendMail({
                to: student.partner.email,
                ...emailTemplates.earningAdded(Number(commissionAmount), 'Admission Reward')
            }).catch(e => console.error("Reward email error:", e));
        }

        // 3. Notify status update to partner
        sendMail({
            to: student.partner.email,
            ...emailTemplates.statusChanged(student.studentName, status)
        }).catch(e => console.error("Status update email error:", e));

        return NextResponse.json({ message: "Student and partner rewards updated successfully" });

    } catch (error: any) {
        console.error("Student status update error:", error);
        return NextResponse.json({ message: "Error updating student status" }, { status: 500 });
    }
}
