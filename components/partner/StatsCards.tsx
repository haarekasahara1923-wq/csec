import { Users, GraduationCap, Wallet, CreditCard, Banknote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsStats {
    totalStudents: number;
    admittedStudents: number;
    totalEarnings: number;
    pendingEarnings: number;
    paidEarnings: number;
}

export const StatsCards = ({ stats }: { stats: StatsStats }) => {
    const items = [
        { title: "Total Students", value: stats.totalStudents, icon: Users, color: "bg-blue-500", shadow: "shadow-blue-200" },
        { title: "Admitted", value: stats.admittedStudents, icon: GraduationCap, color: "bg-emerald-500", shadow: "shadow-emerald-200" },
        { title: "Earnings (₹)", value: stats.totalEarnings, icon: Wallet, color: "bg-indigo-600", shadow: "shadow-indigo-200" },
        { title: "Pending", value: stats.pendingEarnings, icon: CreditCard, color: "bg-amber-500", shadow: "shadow-amber-200" },
        { title: "Paid", value: stats.paidEarnings, icon: Banknote, color: "bg-teal-500", shadow: "shadow-teal-200" },
    ];

    return (
        <>
            {items.map((item, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="space-y-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", item.color, item.shadow, "shadow-lg group-hover:scale-110 transition-transform")}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{item.title}</h4>
                            <p className="text-2xl font-black text-slate-800 tracking-tight">
                                {typeof item.value === 'number' && i > 1 ? `₹${item.value.toLocaleString()}` : item.value}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
