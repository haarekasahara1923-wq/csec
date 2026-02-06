import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen, Clock, Globe } from "lucide-react";

export const metadata = {
    title: "Our Courses | CSEC Gwalior",
};

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({ where: { active: true } });

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Professional Header Section */}
            <section className="bg-[#0F172A] pt-40 pb-52 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-4 bg-secondary/10 text-secondary rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-secondary/20">
                        Educational Excellence
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Shape Your <span className="text-secondary">Future</span> With Us
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                        Discover top-tier educational pathways specifically designed to help you achieve global success.
                    </p>
                </div>
            </section>

            {/* Courses Grid with catchy UI */}
            <section className="-mt-32 pb-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course: { id: string; title: string, description: string }) => (
                            <Card key={course.id} className="group border-none shadow-2xl shadow-slate-200/50 rounded-[40px] overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2">
                                <div className="h-64 bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                    <GraduationCap className="w-24 h-24 text-slate-400/30 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute bottom-6 left-8 bg-white/95 backdrop-blur shadow-sm px-4 py-2 rounded-2xl flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none pt-0.5">Application Open</span>
                                    </div>
                                </div>

                                <CardContent className="p-10">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <BookOpen className="w-4 h-4 text-secondary" />
                                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Full Time Program</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <Globe className="w-4 h-4 text-slate-300" />
                                            <span className="text-xs font-bold text-slate-600">Global Recognition</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4 text-slate-300" />
                                            <span className="text-xs font-bold text-slate-600">Career Focused</span>
                                        </div>
                                    </div>

                                    <Link href={`/apply?course=${encodeURIComponent(course.title)}`}>
                                        <Button className="w-full h-14 bg-primary text-white font-bold rounded-2xl hover:bg-secondary transition-all shadow-lg shadow-primary/20 hover:shadow-secondary/40">
                                            Enquire Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {courses.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-slate-100 max-w-2xl mx-auto">
                            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Expanding Portfolio</h3>
                            <p className="text-slate-400">We are currently updating our course catalog. Please check back soon.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
