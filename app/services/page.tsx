import { GraduationCap, BookOpen, Globe, Users, Briefcase, School } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

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
            title: "Direct Admission Guidance",
            desc: "We simplify the complex admission process for various UG/PG courses like MBBS, B.Tech, MBA, etc., in top government and private universities.",
            image: "https://images.unsplash.com/photo-1523050335392-9ae86eb197ee?q=80&w=800&auto=format&fit=crop",
            details: ["Form Filling Support", "Document Verification", "Seat Allocation Guidance", "Quota Eligibility Check"]
        },
        {
            id: "study-abroad",
            icon: Globe,
            title: "Study Abroad Consultancy",
            desc: "Unlock global opportunities with our overseas education services. We help you choose the right country, university, and course that fits your budget.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
            details: ["Country Selection", "Visa Interview Prep", "Statement of Purpose (SOP)", "Pre-departure Briefing"]
        },
        {
            id: "placement",
            icon: Briefcase,
            title: "Placement Preparation",
            desc: "We don't just stop at admission. We provide resources and guidance to help students prepare for campus placements and off-campus opportunities.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
            details: ["Resume Building", "Interview Skills", "Soft Skills Training", "Mock Sessions"]
        }
    ];

    return (
        <div className="pt-24">
            <section className="bg-primary/95 py-32 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-900" />
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">Our <span className="text-secondary italic">Services</span></h1>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">End-to-end educational support designed to turn your academic dreams into global success.</p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-32">
                        {services.map((service, idx) => (
                            <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-16 md:gap-24 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`} id={service.id}>
                                <div className="lg:w-1/2 space-y-10 group">
                                    <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary shadow-xl shadow-secondary/5 group-hover:scale-110 transition-transform duration-500">
                                        <service.icon className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-none">{service.title}</h2>
                                        <div className="w-20 h-2 bg-secondary rounded-full" />
                                    </div>
                                    <p className="text-slate-500 text-xl font-medium leading-relaxed">{service.desc}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                                        {service.details.map((detail, i) => (
                                            <div key={i} className="flex items-center space-x-3 text-slate-700 font-bold text-sm tracking-tight">
                                                <div className="w-2 h-2 bg-secondary rounded-full shrink-0" />
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6">
                                        <Link href="/contact">
                                            <Button size="lg" className="h-20 px-12 rounded-2xl bg-secondary hover:bg-white hover:text-primary text-primary font-black text-xl shadow-2xl shadow-secondary/10 transition-all duration-300">
                                                Enquire Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                    <div className="relative aspect-[4/3] rounded-[64px] overflow-hidden shadow-3xl shadow-slate-200 group">
                                        <img 
                                            src={service.image} 
                                            alt={service.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20">
                                            <p className="text-primary font-black text-xs uppercase tracking-widest leading-none">CSEC Certified</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
