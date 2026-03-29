import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        // Simplified admin role check
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const partners = await prisma.partner.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { students: true }
                }
            }
        });

        return NextResponse.json(partners);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching partners" }, { status: 500 });
    }
}
