"use client";

import { CheckCircle, Trash2 } from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/app/actions/leads";
import { useRouter } from "next/navigation";

export function LeadActions({ id, status }: { id: string; status: string }) {
    const router = useRouter();

    const handleStatusUpdate = async () => {
        const newStatus = status === "NEW" ? "CONTACTED" : "CONVERTED";
        const result = await updateLeadStatus(id, newStatus);
        if (result.success) {
            router.refresh();
        }
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this lead?")) {
            const result = await deleteLead(id);
            if (result.success) {
                router.refresh();
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleStatusUpdate}
                className="p-2 text-slate-400 hover:text-green-500 hover:bg-white rounded-lg transition-all"
                title="Mark as Contacted"
            >
                <CheckCircle className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                title="Delete Lead"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
