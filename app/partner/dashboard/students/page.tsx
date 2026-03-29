"use client";

import useSWR from "swr";
import { format } from "date-fns";
import { 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    Loader2, 
    Download,
    Plus
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MyStudentsPage() {
    const { data: students, error, isLoading } = useSWR("/api/partner/students", fetcher);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter logic
    const filteredStudents = students ? students.filter((s: any) => {
        const matchesSearch = s.studentName.toLowerCase().includes(search.toLowerCase()) || 
                             s.interestedCourse.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || s.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    }) : [];

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-[#1a56db] opacity-20" />
                    <Loader2 className="w-16 h-16 animate-spin text-[#1a56db] absolute inset-0 [animation-delay:-0.5s]" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Loading Students Network...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Student Network</h1>
                    <p className="text-slate-500 font-medium">Manage and track your submitted student leads.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="h-14 rounded-2xl border-slate-200 text-slate-500 font-bold px-6">
                        <Download className="w-5 h-5 mr-2" />
                        Export CSV
                    </Button>
                    <Link href="/partner/dashboard/add-student">
                        <Button className="bg-[#1a56db] hover:bg-[#1a56db]/90 rounded-2xl h-14 px-8 font-black flex items-center space-x-2 shadow-xl shadow-[#1a56db]/20">
                            <Plus className="w-6 h-6" />
                            <span>Add Student</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-[#1a56db] transition-colors" />
                    <Input 
                        placeholder="Search by student name, course or mobile..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-14 h-16 rounded-[20px] bg-slate-50 border-slate-100 focus:bg-white text-lg font-medium"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-50 border border-slate-100 px-6 h-16 rounded-[20px] flex items-center space-x-4">
                        <Filter className="w-5 h-5 text-slate-300" />
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent font-black text-slate-600 outline-none uppercase text-[10px] tracking-widest"
                        >
                            <option value="all">Status: ALL</option>
                            <option value="new">Status: NEW</option>
                            <option value="in_review">Status: IN REVIEW</option>
                            <option value="admitted">Status: ADMITTED</option>
                            <option value="rejected">Status: REJECTED</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Details</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Interested Course</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Location</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Date Submitted</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-24 text-center">
                                        <div className="flex flex-col items-center space-y-4 opacity-50">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Search className="w-10 h-10 text-slate-200" />
                                            </div>
                                            <p className="font-bold text-slate-400">No students found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student: any) => (
                                    <tr key={student.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center space-x-5">
                                                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:from-[#1a56db] group-hover:to-blue-400 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 font-black text-xl uppercase">
                                                    {student.studentName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-lg tracking-tight leading-none mb-1">{student.studentName}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.email || student.mobile}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center text-sm font-black text-slate-600">
                                            {student.interestedCourse}
                                        </td>
                                        <td className="px-10 py-8 text-center text-sm font-bold text-slate-400 capitalize">
                                            {student.city}, {student.state}
                                        </td>
                                        <td className="px-10 py-8 text-center text-sm font-bold text-slate-400">
                                            {format(new Date(student.createdAt), "dd MMM, yyyy")}
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <StatusBadge status={student.status} />
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button className="w-12 h-12 bg-slate-50 rounded-xl text-slate-400 hover:text-[#1a56db] hover:bg-[#1a56db]/10 transition-all flex items-center justify-center group/btn shadow-sm">
                                                    <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                                <button className="w-12 h-12 bg-slate-50 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center group/btn shadow-sm">
                                                    <Edit className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                                <button className="w-12 h-12 bg-slate-50 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center group/btn shadow-sm">
                                                    <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
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
        </div>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        new: "bg-amber-500/10 text-amber-600 border-amber-200/50",
        in_review: "bg-blue-500/10 text-blue-600 border-blue-200/50",
        admitted: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
        rejected: "bg-rose-500/10 text-rose-600 border-rose-200/50",
    }
    const style = styles[status.toLowerCase()] || "bg-slate-500/10 text-slate-600 border-slate-200/50";
    return (
        <span className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap inline-block ${style}`}>
            {status.replace(/_/g, ' ')}
        </span>
    );
}
