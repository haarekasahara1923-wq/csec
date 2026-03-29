import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";
import { sendMail, emailTemplates } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { studentData, documents } = body;
        const partnerId = user.id as string;

        if (!studentData || !studentData.studentName || !studentData.mobile) {
            return NextResponse.json({ message: "Missing required student information" }, { status: 400 });
        }

        // 1. Upload documents to Cloudinary
        const uploadedDocs = [];
        if (documents && Array.isArray(documents)) {
            for (const doc of documents) {
                try {
                    const uploadResult = await uploadFile(doc.base64);
                    uploadedDocs.push({
                        fileName: doc.fileName || uploadResult.fileName,
                        fileUrl: uploadResult.fileUrl,
                        fileType: doc.fileType || uploadResult.fileType
                    });
                } catch (err) {
                    console.error("Single document upload error:", err);
                }
            }
        }

        // 2. Save to DB
        const student = await prisma.student.create({
            data: {
                partnerId,
                studentName: studentData.studentName,
                fatherName: studentData.fatherName,
                motherName: studentData.motherName || "",
                address: studentData.address,
                city: studentData.city,
                state: studentData.state,
                pincode: studentData.pincode,
                mobile: studentData.mobile,
                email: studentData.email || "",
                academicQual: `${studentData.academicQual} - ${studentData.percentage}%`,
                interestedCourse: studentData.interestedCourse,
                preferredUniv: studentData.preferredUniv || "",
                query: studentData.query || "",
                documents: uploadedDocs as any,
                status: "new"
            }
        });

        // 3. Send Notifications
        const partnerName = user.name || "Partner";

        sendMail({
            to: user.email as string,
            ...emailTemplates.studentSubmitted(studentData.studentName)
        }).catch((err: any) => console.error("Partner Email Error:", err));

        sendMail({
            to: process.env.ADMIN_EMAIL || 'csecgwl@gmail.com',
            ...emailTemplates.adminNewStudent(studentData.studentName, partnerName)
        }).catch((err: any) => console.error("Admin Email Error:", err));

        return NextResponse.json({
            message: "Student lead submitted successfully",
            studentId: student.id
        }, { status: 201 });

    } catch (error: any) {
        console.error("Student submission API error:", error);
        return NextResponse.json({ message: "Something went wrong during submission" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const partnerId = user.id as string;
        const students = await prisma.student.findMany({
            where: { partnerId },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching students" }, { status: 500 });
    }
}
