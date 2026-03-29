"use client";

import useSWR, { mutate } from "swr";
import { 
    Search, 
    Edit, 
    Loader2,
    FileText,
    ExternalLink,
    GraduationCap,
    Clock,
    UserCheck,
    Users
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { StudentUpdateModal } from "@/components/admin/StudentUpdateModal";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AdminPartnerStudentsPage() {
    const { data: students, isLoading } = useSWR("/api/admin/partner-students", fetcher);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const filteredStudents = students ? (students as any[]).filter(s => 
        s.studentName.toLowerCase().includes(search.toLowerCase()) || 
        s.partner.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.partner.affiliateCode.toLowerCase().includes(search.toLowerCase())
    ) : [];

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "new": return "bg-amber-500/10 text-amber-600 border-amber-100";
            case "in_review": return "bg-blue-500/10 text-blue-600 border-blue-100";
            case "admitted": return "bg-emerald-500/10 text-emerald-600 border-emerald-100";
            case "rejected": return "bg-rose-500/10 text-rose-600 border-rose-100";
            default: return "bg-slate-500/10 text-slate-600 border-slate-100";
        }
    };

    if (isLoading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs tracking-tight">Accessing Central Registry...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Partner Students</h2>
                    <p className="text-sm text-slate-500 font-medium">Process student applications submitted via affiliate network.</p>
                </div>
                <div className="w-full md:w-1/3 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input 
                        placeholder="Search student or partner ID..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-12 border-slate-200 focus:bg-slate-50"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Submission Details</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Course & Univ</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Affiliate Info</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center space-y-4 opacity-50">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                <GraduationCap className="w-8 h-8 text-slate-200" />
                                            </div>
                                            <p className="text-slate-400 font-bold italic tracking-tight uppercase text-[10px] tracking-widest">No student leads discovered</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((s) => (
                                    <tr key={s.id} className="hover:bg-slate-100/30 transition-all duration-300 group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black uppercase tracking-tight group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                    {s.studentName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-base leading-none mb-1">{s.studentName}</p>
                                                    <div className="flex items-center space-x-2 text-[10px] uppercase font-black tracking-widest text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{format(new Date(s.createdAt), "dd MMM yyyy")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-700">{s.interestedCourse}</p>
                                            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mt-0.5">{s.preferredUniv || "Direct Admission"}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all group/partner">
                                                <p className="font-black text-slate-600 text-[10px] uppercase tracking-widest mb-1 italic opacity-60">Submitted By:</p>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></div>
                                                    <p className="font-black text-slate-800 text-xs tracking-tight uppercase">{s.partner.fullName}</p>
                                                </div>
                                                <p className="text-[10px] font-black text-primary uppercase ml-4">{s.partner.affiliateCode}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap inline-block ${getStatusStyle(s.status)}`}>
                                                {s.status.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button 
                                                    onClick={() => setSelectedStudent(s)}
                                                    className="w-12 h-12 bg-slate-50 rounded-[18px] text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm group-hover:rotate-3"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button className="w-12 h-12 bg-slate-50 rounded-[18px] text-slate-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm group-hover:-rotate-3">
                                                    <FileText className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedStudent && (
                <StudentUpdateModal 
                    student={selectedStudent} 
                    onClose={() => setSelectedStudent(null)} 
                    onUpdate={() => mutate("/api/admin/partner-students")} 
                />
            )}
        </div>
    );
}
