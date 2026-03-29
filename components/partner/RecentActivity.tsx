import { format } from "date-fns";
import { GraduationCap, Eye } from "lucide-react";
import Link from "next/link";

export const RecentActivity = ({ students }: { students: any[] }) => {
    if (!students || students.length === 0) {
        return (
            <div className="bg-white p-20 rounded-[40px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-slate-300" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-700 tracking-tight">No Students Registered Yet</h4>
                    <p className="text-slate-500 font-medium">Start adding student leads to see them here.</p>
                </div>
            </div>
        );
    }

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "new": return "bg-amber-500/10 text-amber-600 border-amber-200/50";
            case "in_review": return "bg-blue-500/10 text-blue-600 border-blue-200/50";
            case "admitted": return "bg-emerald-500/10 text-emerald-600 border-emerald-200/50";
            case "rejected": return "bg-rose-500/10 text-rose-600 border-rose-200/50";
            default: return "bg-slate-500/10 text-slate-600 border-slate-200/50";
        }
    };

    return (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student Name</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Course</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Submitted On</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((student) => (
                            <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-[#1a56db]/5 rounded-xl flex items-center justify-center text-[#1a56db] font-black group-hover:scale-110 transition-transform uppercase">
                                            {student.studentName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 tracking-tight">{student.studentName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{student.email || student.mobile}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-bold text-slate-600">{student.interestedCourse}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-bold text-slate-400">{format(new Date(student.createdAt), "dd MMM yyyy")}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap ${getStatusStyle(student.status)}`}>
                                        {student.status.replace(/_/g, ' ')}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <Link href={`/partner/dashboard/students`}>
                                        <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-[#1a56db] hover:bg-[#1a56db]/10 transition-all">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
