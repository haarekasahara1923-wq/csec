import { GraduationCap, BookOpen, Globe, Users, Briefcase, School, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
    const services = [
        {
            id: "counseling",
            icon: Users,
            title: "Career Counseling",
            desc: "Our expert counselors interact with students to identify their strengths, interests, and career goals. We provide a roadmap that aligns with their future aspirations.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
            details: ["Aptitude Assessment", "Interest Mapping", "Parent-Student Guidance", "Industry Trends Briefing"]
        },
        {
            id: "admission",
            icon: School,
            title: "Admission Guidance",
            desc: "We simplify the complex admission process for various UG/PG courses like MBBS, B.Tech, MBA, etc., in top government and private universities.",
            image: "/service_admission.png",
            details: ["Form Filling Support", "Document Verification", "Seat Allocation Guidance", "Quota Eligibility Check"]
        },
        {
            id: "study-abroad",
            icon: Globe,
            title: "Study Abroad",
            desc: "Unlock global opportunities with our overseas education services. We help you choose the right country, university, and course that fits your budget.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
            details: ["Country Selection", "Visa Interview Prep", "Statement of Purpose (SOP)", "Pre-departure Briefing"]
        },
        {
            id: "placement",
            icon: Briefcase,
            title: "Placement prep",
            desc: "We don't just stop at admission. We provide resources and guidance to help students prepare for campus placements and off-campus opportunities.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
            details: ["Resume Building", "Interview Skills", "Soft Skills Training", "Mock Sessions"]
        }
    ];

    return (
        <div className="pt-32 min-h-screen bg-white overflow-x-hidden">
            <section className="bg-[#020617] py-32 md:py-56 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent blur-3xl opacity-50" />
                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <div className="mb-12 space-y-6">
                        <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase bg-white/5 px-6 py-2 rounded-full border border-white/10">Tailored Solutions</span>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-8">
                            Our <span className="text-gold italic">Services.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">End-to-end educational support designed to turn your academic dreams into global success stories.</p>
                    </div>
                </div>
            </section>

            <section className="py-32 md:py-48 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="space-y-48 md:space-y-72">
                        {services.map((service, idx) => (
                            <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-16 md:gap-32 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`} id={service.id}>
                                <motion.div 
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="lg:w-1/2 space-y-12 group"
                                >
                                    <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-secondary shadow-3xl shadow-primary/10 group-hover:rotate-12 transition-transform duration-500 border border-white/10">
                                        <service.icon className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-6">
                                        <h2 className="text-5xl md:text-8xl font-black text-primary tracking-tighter leading-none">{service.title}</h2>
                                        <div className="w-24 h-2 bg-secondary rounded-full" />
                                    </div>
                                    <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">{service.desc}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-slate-50 rounded-[48px] border border-slate-100 shadow-sm shadow-slate-200/50">
                                        {service.details.map((detail, i) => (
                                            <div key={i} className="flex items-center space-x-6">
                                                <div className="w-6 h-6 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary border border-secondary/20">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <span className="text-primary font-black text-sm tracking-tight">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-8 flex justify-center lg:justify-start">
                                        <Link href="/contact">
                                            <Button size="lg" className="h-24 px-16 rounded-[40px] bg-primary text-white font-black text-2xl shadow-3xl shadow-primary/20 hover:bg-secondary hover:text-primary transition-all duration-500">
                                                Get Started <ArrowRight className="ml-3 w-6 h-6" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="lg:w-1/2 w-full"
                                >
                                    <div className="relative aspect-square rounded-[80px] overflow-hidden shadow-royal group p-4 bg-slate-50 border border-white">
                                        <img 
                                            src={service.image} 
                                            alt={service.title} 
                                            className="w-full h-full object-cover rounded-[64px] transition-transform duration-[2000ms] group-hover:scale-110" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000" />
                                        <div className="absolute top-12 right-12 bg-white/90 backdrop-blur-2xl px-8 py-4 rounded-[32px] shadow-2xl border border-white/20">
                                            <p className="text-primary font-black text-xs uppercase tracking-widest leading-none">CSEC Diamond Standard</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
