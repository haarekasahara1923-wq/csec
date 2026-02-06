"use client";

import { Pencil, Trash2 } from "lucide-react";
import { deleteCourse } from "@/app/actions/courses";
import { useRouter } from "next/navigation";

export function CourseActions({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this course?")) {
            const result = await deleteCourse(id);
            if (result.success) {
                router.refresh();
            }
        }
    };

    return (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg"
                title="Edit Course"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg"
                title="Delete Course"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
