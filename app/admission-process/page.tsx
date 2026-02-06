import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, UserPlus, FileText, ClipboardCheck, GraduationCap } from "lucide-react";

export default function AdmissionProcessPage() {
    const steps = [
        {
            icon: UserPlus,
            title: "Initial Counseling",
            desc: "Connect with our expert advisors for a one-on-one session to understand your interests and goals.",
        },
        {
            icon: FileText,
            title: "Course & University Shortlisting",
            desc: "Based on your academic profile, we help you pick the best-fit courses and universities.",
        },
        {
            icon: ClipboardCheck,
            title: "Documentation & Application",
            desc: "Our team assists with form filling, document verification, and submission to multiple universities.",
        },
        {
            icon: GraduationCap,
            title: "Secured Admission",
            desc: "Once specialized entry requirements are met, we help you complete the final enrollment.",
        },
    ];

    return (
        <div className="pt-24">
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary">Simple Admission Process</h1>
                        <p className="text-gray-500 text-lg">Your step-by-step journey from query to classroom.</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

                        {/* Steps */}
                        <div className="space-y-16">
                            {steps.map((step, idx) => (
                                <div key={idx} className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                                        <div className={`p-8 rounded-2xl bg-white shadow-xl max-w-sm border border-gray-100 relative z-10 hover:border-secondary transition-colors duration-300`}>
                                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary mb-6">
                                                <step.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex md:w-0 items-center justify-center relative z-20">
                                        <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-lg" />
                                    </div>
                                    <div className="md:w-1/2" />
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
