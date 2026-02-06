"use client";

import { Pencil, Trash2 } from "lucide-react";
import { deleteUniversity } from "@/app/actions/universities";
import { useRouter } from "next/navigation";

export function UniversityActions({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this university?")) {
            const result = await deleteUniversity(id);
            if (result.success) {
                router.refresh();
            }
        }
    };

    return (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg"
                title="Edit University"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg"
                title="Delete University"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
