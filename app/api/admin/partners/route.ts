import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const partners = await (prisma as any).partner.findMany({
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
