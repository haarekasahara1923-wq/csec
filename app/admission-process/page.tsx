"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, UserPlus, FileText, ClipboardCheck, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="pt-32 min-h-screen bg-white overflow-x-hidden">
            <section className="bg-[#020617] py-32 md:py-56 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent blur-3xl" />
                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <div className="mb-12 space-y-4">
                        <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase bg-white/5 px-6 py-2 rounded-full border border-white/10">The Road to Success</span>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-8">
                            Elite <span className="text-gold italic">Process.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">Your step-by-step journey from initial query to secured classroom enrollment at global institutions.</p>
                    </div>
                </div>
            </section>

            <section className="py-32 md:py-48 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="relative">
                        {/* Royal Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-secondary via-primary/10 to-transparent -translate-x-1/2 hidden md:block" />

                        {/* Steps Container */}
                        <div className="space-y-32 md:space-y-56">
                            {steps.map((step, idx) => (
                                <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 md:gap-32 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Card Content - Royal Glass */}
                                    <div className="md:w-1/2 w-full">
                                        <div className="p-10 md:p-16 rounded-[64px] bg-slate-50 shadow-royal relative z-10 border border-white group hover:shadow-2xl transition-all duration-700">
                                            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-secondary mb-10 shadow-3xl shadow-primary/10 group-hover:rotate-12 transition-transform duration-500 border border-white/10">
                                                <step.icon className="w-10 h-10" />
                                            </div>
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase bg-white px-4 py-2 rounded-full border border-slate-100 italic">Step 0{idx + 1}</span>
                                                <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none">{step.title}</h3>
                                                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Royal Center Dot */}
                                    <div className="hidden md:flex md:w-0 items-center justify-center relative z-20">
                                        <div className="w-12 h-12 rounded-full bg-white border-[6px] border-primary shadow-2xl flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                                        </div>
                                    </div>

                                    {/* Step Image - Luxury Rounded */}
                                    <div className="md:w-1/2 w-full">
                                        <div className="relative aspect-square rounded-[80px] overflow-hidden shadow-royal group p-4 bg-slate-50 border border-white">
                                            <img 
                                                src={step.image} 
                                                alt={step.title} 
                                                className="w-full h-full object-cover rounded-[64px] transition-transform duration-[2000ms] group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-48 text-center space-y-12">
                        <div className="h-[2px] w-32 bg-secondary/30 mx-auto" />
                        <Link href="/apply">
                            <Button size="lg" className="h-24 px-16 rounded-[40px] text-2xl font-black bg-primary text-white shadow-3xl shadow-primary/20 hover:bg-secondary hover:text-primary transition-all duration-500">
                                Start Your Mission Now <ArrowRight className="ml-3 w-8 h-8" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Checklist - Elite Grid */}
            <section className="py-32 md:py-56 bg-[#020617] relative overflow-hidden">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
                <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase mb-6 block">Ready to Submit?</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Administrative <span className="text-gold italic">Checklist.</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            "10th & 12th Academic Records",
                            "Identity Verification (Govt ID)",
                            "Entrance Scorecards (JEE/NEET/MBA)",
                            "Valid Passport (for Study Abroad)",
                            "Recent Professional Photographs",
                            "Migration & Transfer Certificates",
                            "Gap Year Documentation",
                            "Category/Scholarship Certificates",
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center space-x-6 p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-lg">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <span className="text-white text-lg font-black tracking-tight leading-none pt-1">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
