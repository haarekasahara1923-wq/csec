import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { School, MapPin, Globe, Sparkles, Building2 } from "lucide-react";

export const metadata = {
    title: "Partner Universities | CSEC Gwalior",
};

export default async function UniversitiesPage() {
    const universities = await prisma.university.findMany({ where: { active: true } });

    return (
        <div className="min-h-screen bg-white">
            {/* Elegant Header */}
            <section className="bg-[#F8FAFC] py-32 border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-8">
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Global Partners</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">
                        Distinguished <span className="text-secondary">Academies</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        CSEC is proud to be an official representative of India's most prestigious universities and colleges.
                    </p>
                </div>
            </section>

            {/* University Cards with premium UI */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {universities.map((uni) => (
                            <Card key={uni.id} className="group flex flex-col md:flex-row items-stretch border-none bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[48px] overflow-hidden transition-all duration-700">
                                <div className="md:w-[35%] bg-slate-50 min-h-[280px] relative overflow-hidden flex items-center justify-center p-12">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                    <Building2 className="w-20 h-20 text-slate-200 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-8 left-8">
                                        <div className="w-10 h-1bg-secondary rounded-full opacity-20 group-hover:w-16 transition-all duration-500"></div>
                                    </div>
                                </div>
                                <CardContent className="md:w-[65%] p-12 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2 text-secondary font-black text-[10px] uppercase tracking-[0.2em]">
                                            <MapPin className="w-3 h-3" />
                                            <span>{uni.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{uni.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium leading-[1.8] line-clamp-4">
                                            {uni.description}
                                        </p>
                                    </div>
                                    <div className="mt-10">
                                        <Link href={`/apply?university=${encodeURIComponent(uni.name)}`}>
                                            <Button className="bg-[#0F172A] text-white px-8 py-6 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-secondary transition-all">
                                                Get Admission Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-40 bg-[#0F172A] rounded-[60px] p-8 md:p-20 text-center md:text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 translate-x-1/4"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl space-y-4">
                                <h4 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">Looking for more?</h4>
                                <p className="text-slate-400 text-lg font-medium">We represent over 150+ premier institutions across the country. Let us find the perfect match for you.</p>
                            </div>
                            <Link href="/contact" className="shrink-0 w-full md:w-auto">
                                <Button size="lg" className="w-full md:w-auto bg-secondary text-white px-16 py-8 rounded-3xl text-lg font-black shadow-2xl shadow-secondary/20 hover:scale-105 hover:bg-white hover:text-primary transition-all duration-500">
                                    Explore Full Network
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
