import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, UserPlus, FileText, ClipboardCheck, GraduationCap } from "lucide-react";

export default function AdmissionProcessPage() {
    const steps = [
        {
            icon: UserPlus,
            title: "Initial Counseling",
            desc: "Connect with our expert advisors for a one-on-one session to understand your interests and goals.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
        },
        {
            icon: FileText,
            title: "Course & University Shortlisting",
            desc: "Based on your academic profile, we help you pick the best-fit courses and universities.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
        },
        {
            icon: ClipboardCheck,
            title: "Documentation & Application",
            desc: "Our team assists with form filling, document verification, and submission to multiple universities.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
        },
        {
            icon: GraduationCap,
            title: "Secured Admission",
            desc: "Once specialized entry requirements are met, we help you complete the final enrollment.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
        },
    ];

    return (
        <div className="pt-24">
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">Simple Admission Process</h1>
                        <p className="text-slate-400 text-lg font-bold uppercase tracking-widest text-xs">Your step-by-step journey from query to classroom.</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />

                        {/* Steps */}
                        <div className="space-y-16 md:space-y-32">
                            {steps.map((step, idx) => (
                                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Card Content */}
                                    <div className="md:w-1/2 flex justify-center">
                                        <div className={`p-8 md:p-12 rounded-[40px] bg-white shadow-2xl shadow-slate-200/50 max-w-lg border border-slate-100 relative z-10 hover:border-secondary transition-all duration-500 group`}>
                                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-8 shadow-lg shadow-secondary/10 group-hover:scale-110 transition-transform">
                                                <step.icon className="w-8 h-8" />
                                            </div>
                                            <p className="text-secondary font-black text-sm uppercase tracking-widest mb-2 opacity-50">Step {idx + 1}</p>
                                            <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">{step.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="hidden md:flex md:w-0 items-center justify-center relative z-20">
                                        <div className="w-10 h-10 rounded-full bg-primary border-4 border-white shadow-2xl" />
                                    </div>

                                    {/* Step Image */}
                                    <div className="md:w-1/2 w-full px-4 md:px-0">
                                        <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200 group">
                                            <img 
                                                src={step.image} 
                                                alt={step.title} 
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <Link href="/apply">
                            <Button size="lg" className="px-12 rounded-full h-16 text-lg shadow-xl shadow-primary/20">
                                Start My Process Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Checklist */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">General Requirements Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            "10th & 12th Marksheets (Original & Copy)",
                            "Graduation Degree/Marksheets (for PG)",
                            "Identity Proof (Aadhar, PAN, etc.)",
                            "Entrance Exam Scorecards (if any)",
                            "Recent Passport Size Photographs",
                            "Migration/Transfer Certificate",
                            "Gap Certificate (if applicable)",
                            "Caste/Income Certificate (for scholarships)",
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-gray-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
