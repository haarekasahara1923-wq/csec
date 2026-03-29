import { AddStudentForm } from "@/components/partner/AddStudentForm";

export default function AddStudentPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Add New Student</h1>
                <p className="text-slate-500 font-medium leading-relaxed">Fill in the details below to submit a new student lead. Please ensure all documents are clear.</p>
            </div>

            <AddStudentForm />
        </div>
    );
}
