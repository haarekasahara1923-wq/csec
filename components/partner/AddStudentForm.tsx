"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
    User, 
    BookOpen, 
    Upload, 
    FileText, 
    X, 
    Loader2, 
    GraduationCap,
    Info,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export const AddStudentForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<{file: File, type: string}[]>([]);
    
    const [formData, setFormData] = useState({
        studentName: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "Male",
        address: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
        email: "",
        academicQual: "12th Pass",
        percentage: "",
        board: "",
        interestedCourse: "B.Tech",
        preferredUniv: "",
        query: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        if (files.length + selectedFiles.length > 5) {
            toast.error("Maximum 5 documents allowed");
            return;
        }

        const newFiles = Array.from(selectedFiles).map(file => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is too large (max 5MB)`);
                return null;
            }
            return { file, type: "Marksheet" };
        }).filter(Boolean) as {file: File, type: string}[];

        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const updateFileType = (index: number, type: string) => {
        setFiles(prev => {
            const updated = [...prev];
            updated[index].type = type;
            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Convert files to base64 for submission
            const filePromises = files.map(f => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve({
                        base64: reader.result,
                        fileName: f.file.name,
                        fileType: f.type
                    });
                    reader.readAsDataURL(f.file);
                });
            });

            const uploadedFiles = await Promise.all(filePromises);

            const res = await fetch("/api/partner/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentData: formData,
                    documents: uploadedFiles
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to submit student");
            }

            toast.success("Student submitted successfully!");
            router.push("/partner/dashboard/students");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12 pb-20">
            {/* Section 1: Personal Details */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Personal Details</h3>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Step 1 of 3</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Student Full Name *</label>
                        <Input name="studentName" required value={formData.studentName} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Father's Name *</label>
                        <Input name="fatherName" required value={formData.fatherName} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Mother's Name</label>
                        <Input name="motherName" value={formData.motherName} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Date of Birth</label>
                        <Input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100 px-4">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number *</label>
                        <Input name="mobile" required value={formData.mobile} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Residential Address *</label>
                        <Input name="address" required value={formData.address} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">City *</label>
                        <Input name="city" required value={formData.city} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">State *</label>
                        <Input name="state" required value={formData.state} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Pincode *</label>
                        <Input name="pincode" required value={formData.pincode} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                </div>
            </div>

            {/* Section 2: Academic Details */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-100">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Academic Details</h3>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Step 2 of 3</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Highest Qualification *</label>
                        <select name="academicQual" value={formData.academicQual} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100 px-4">
                            <option>10th Pass</option>
                            <option>12th Pass</option>
                            <option>Graduation</option>
                            <option>Post Grad</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Percentage / CGPA *</label>
                        <Input name="percentage" required value={formData.percentage} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Board / University Name</label>
                        <Input name="board" value={formData.board} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Interested Course *</label>
                        <select name="interestedCourse" value={formData.interestedCourse} onChange={handleInputChange} className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100 px-4">
                            <option>B.Tech</option>
                            <option>MBA</option>
                            <option>BBA</option>
                            <option>MBBS</option>
                            <option>LLB</option>
                            <option>Study Abroad</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Preferred University (Optional)</label>
                        <Input name="preferredUniv" value={formData.preferredUniv} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                    <div className="md:col-span-1 space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Any Specific Query?</label>
                        <Input name="query" value={formData.query} onChange={handleInputChange} className="h-12 bg-slate-50 border-slate-100" />
                    </div>
                </div>
            </div>

            {/* Section 3: Document Upload */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                        <Upload className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Document Upload</h3>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Step 3 of 3</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div 
                            className="border-2 border-dashed border-slate-200 rounded-[32px] p-12 flex flex-col items-center justify-center space-y-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group relative"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input 
                                id="file-upload" 
                                type="file" 
                                multiple 
                                hidden 
                                accept="application/pdf,image/*" 
                                onChange={handleFileUpload} 
                            />
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="font-black text-slate-800">Click to Upload Files</p>
                                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Supported: PDF, JPG, PNG (Max 5MB)</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start space-x-4">
                            <Info className="w-6 h-6 text-amber-500 shrink-0" />
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                Uploading documents like 10th/12th marksheets, ID proof, and photographs speeds up the admission process. 
                                <span className="font-black text-slate-800"> Maximum 5 files allowed.</span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Selected Files ({files.length}/5)</h4>
                        {files.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-10 opacity-30 italic font-medium">
                                No files selected
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {files.map((f, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-black text-slate-800 truncate">{f.file.name}</p>
                                                <select 
                                                    value={f.type} 
                                                    onChange={(e) => updateFileType(i, e.target.value)}
                                                    className="text-[10px] font-black uppercase text-[#1a56db] bg-transparent outline-none cursor-pointer"
                                                >
                                                    <option>Marksheet</option>
                                                    <option>ID Proof</option>
                                                    <option>Photo</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFile(i)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-16 px-12 rounded-[24px] bg-[#1a56db] hover:bg-[#1a56db]/90 text-white font-black text-xl shadow-2xl shadow-[#1a56db]/20 flex items-center space-x-4 group min-w-[300px]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Submitting...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-6 h-6" />
                            <span>Submit Student Lead</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
