"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Award,
  ArrowRight,
  BookOpen,
  Phone,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses?take=4');
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                console.error("Failed to fetch courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="overflow-x-hidden pt-32 bg-white">
            {/* Royal Hero Section */}
            <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#020617]" />
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-secondary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                        <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-xl"
                            >
                                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                <span className="text-secondary text-[10px] uppercase font-black tracking-[0.4em]">Admissions Open 2026</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter"
                            >
                                Your Future <br />
                                <span className="text-gold italic underline decoration-secondary/30 underline-offset-8">Awaits.</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-3xl text-slate-400 max-w-2xl font-medium leading-relaxed"
                            >
                                Premium Education Consultancy in Gwalior. Expert Guidance for Top Institutes of <span className="text-white font-bold">Medical, Management, Engineering, Paramedical, Education, Law and Design.</span>
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start"
                            >
                                <Link href="/apply" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full h-20 px-12 rounded-3xl bg-secondary text-primary font-black text-2xl shadow-3xl shadow-secondary/20 hover:scale-105 transition-all">
                                        Partner Now
                                    </Button>
                                </Link>
                                <Link href="/services" className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="w-full h-20 px-12 rounded-3xl border-white/10 text-white font-black text-2xl hover:bg-white/5 transition-all">
                                        Our Services
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="lg:w-2/5 w-full"
                        >
                            <div className="relative group p-4">
                                <div className="absolute inset-0 bg-secondary/20 rounded-[80px] blur-3xl group-hover:bg-secondary/30 transition-all duration-700" />
                                <div className="relative aspect-[4/5] rounded-[64px] overflow-hidden shadow-2xl border-8 border-white/5 royal-glass">
                                    <img 
                                        src="/medical-hero-generated.png" 
                                        alt="Medical Dreams Come True - MBBS Abroad" 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-12">
                                        <div>
                                            <p className="text-secondary font-black text-xs uppercase tracking-widest mb-2 font-poppins">Since 2008</p>
                                            <h3 className="text-3xl font-black text-white tracking-tighter">Trusted by 10k+ Students</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Royal Services Grid */}
            <section className="py-32 md:py-48 bg-white relative">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-24 space-y-6">
                        <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase bg-secondary/5 px-6 py-2 rounded-full border border-secondary/10">The CSEC Edge</span>
                        <h2 className="text-5xl md:text-8xl font-black text-primary tracking-tighter leading-none">
                            World Class <br /><span className="text-secondary italic">Guidance.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { img: "/service_career.png", title: "Career Counseling", desc: "Expert assessment of your skills and passions to find your perfect professional path." },
                            { img: "/service_uni.png", title: "University Selection", desc: "Identifying top institutions that match your academic profile and long-term goals." },
                            { img: "/service_admission.png", title: "Admission Assistance", desc: "Complete support for applications, from SOP editing to secure enrollment documentation." },
                            { img: "/service_abroad.png", title: "Study Abroad", desc: "Global exposure through our partnerships with leading international universities." },
                            { img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop", title: "Job Placement", desc: "End-to-end career support including internship placement and final job offers." },
                            { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", title: "Scholarship Guidance", desc: "Maximizing your financial aid opportunities with merit and need-based scholarships." },
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="group overflow-hidden border-none bg-slate-50 transition-all duration-700 hover:shadow-royal rounded-[64px] royal-shadow">
                                    <div className="h-80 overflow-hidden relative">
                                        <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Service {idx + 1}</span>
                                        </div>
                                    </div>
                                    <div className="p-12 space-y-4 text-center lg:text-left">
                                        <h4 className="text-3xl font-black text-slate-800 tracking-tighter group-hover:text-secondary transition-colors leading-none">{service.title}</h4>
                                        <p className="text-slate-500 text-lg font-medium leading-relaxed">{service.desc}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses - Royal Edition */}
            <section className="py-32 md:py-48 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 text-center md:text-left">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase bg-white px-6 py-2 rounded-full border border-slate-200">Top Programs</span>
                            <h3 className="text-6xl font-black text-primary tracking-tighter">Premier <span className="text-secondary italic">Courses.</span></h3>
                        </div>
                        <Link href="/courses">
                            <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-primary font-black border border-slate-200 hover:bg-primary hover:text-white transition-all shadow-sm">
                                Explore All <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {!loading && courses.length > 0 ? courses.map((course, idx) => {
                            let courseImage = course.image;
                            if (!courseImage) {
                                const title = course.title.toLowerCase();
                                if (title.includes('mbbs')) courseImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop";
                                else if (title.includes('b.tech') || title.includes('engineering') || title.includes('btech')) courseImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
                                else if (title.includes('mba')) courseImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop";
                                else if (title.includes('bba')) courseImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";
                                else courseImage = "https://images.unsplash.com/photo-1523050335392-9ae86eb197ee?q=80&w=800&auto=format&fit=crop";
                            }

                            return (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Card className="group overflow-hidden border-none bg-white transition-all duration-500 hover:shadow-2xl rounded-[48px] shadow-xl shadow-slate-200/50">
                                        <div className="h-64 overflow-hidden relative">
                                            <img 
                                                src={courseImage || ""} 
                                                alt={course.title} 
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                                        </div>
                                        <CardContent className="p-10 space-y-4">
                                            <h4 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">{course.title}</h4>
                                            <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed">{course.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        }) : (
                            !loading && <p className="text-gray-500 col-span-full text-center">No courses found.</p>
                        )}
                        {loading && <div className="col-span-full py-20 text-center text-primary font-black animate-pulse text-2xl uppercase tracking-widest">Loading Royal Catalog...</div>}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Extra Catchy */}
            <section className="py-32 md:py-56 bg-white overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/5 rounded-[80px] -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                            <div className="relative rounded-[64px] overflow-hidden shadow-royal border-8 border-white bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                                    alt="CSEC Excellence"
                                    className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute bottom-12 right-12 royal-glass p-10 rounded-[40px] shadow-2xl animate-bounce">
                                    <CheckCircle2 className="w-16 h-16 text-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12 text-center lg:text-left">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase bg-secondary/5 px-6 py-2 rounded-full">Excellence Since 2008</span>
                                <h3 className="text-5xl md:text-8xl font-black text-primary tracking-tighter leading-none">Your Success, <br /><span className="text-secondary italic">Simplified.</span></h3>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {[
                                    { title: "Elite Faculty Network", desc: "Guidance from professionals with deep industry roots." },
                                    { title: "Custom Career Roadmaps", desc: "Bespoke strategies tailored to your unique potential." },
                                    { title: "Seamless Transitions", desc: "We manage every detail of your admission journey." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col lg:flex-row items-center lg:items-start gap-6 group">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-500">
                                            <CheckCircle2 className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-primary tracking-tight">{item.title}</h4>
                                            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/about" className="inline-block pt-8">
                                <Button size="lg" className="h-20 px-12 rounded-3xl bg-primary text-white font-black text-xl hover:bg-secondary hover:text-primary transition-all">
                                    Our Legacy <ArrowRight className="ml-2 w-6 h-6" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
