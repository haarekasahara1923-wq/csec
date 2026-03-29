import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Globe, Plane, GraduationCap, ShieldCheck, Landmark } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata = {
    title: "Study Abroad Consultancy | Global Education",
};

export default function StudyAbroadPage() {
    const destinations = [
        { country: "USA", students: "500+", flag: "https://flagcdn.com/w160/us.png" },
        { country: "Canada", students: "400+", flag: "https://flagcdn.com/w160/ca.png" },
        { country: "UK", students: "350+", flag: "https://flagcdn.com/w160/gb.png" },
        { country: "Australia", students: "250+", flag: "https://flagcdn.com/w160/au.png" },
        { country: "Germany", students: "200+", flag: "https://flagcdn.com/w160/de.png" },
        { country: "Philippines", students: "100+", flag: "https://flagcdn.com/w160/ph.png" },
    ];

    return (
        <div className="pt-24 min-h-screen">
            <section className="relative h-[80vh] flex items-center bg-primary/95 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <div className="container mx-auto px-4 relative z-10 text-white space-y-8">
                    <div className="inline-block px-6 py-2 bg-secondary text-primary font-black text-xs rounded-full tracking-widest uppercase shadow-2xl">Global Education</div>
                    <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tighter">Your Dreams <br /><span className="text-secondary italic">Know No Borders.</span></h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-medium leading-relaxed">Complete end-to-end support for international admissions in 20+ countries with expert guidance.</p>
                    <div className="pt-8">
                        <Link href="/apply">
                            <Button size="lg" className="bg-secondary hover:bg-white hover:text-primary text-primary font-black px-12 h-20 rounded-2xl text-xl shadow-3xl shadow-secondary/10 transition-all duration-500">
                                Start Your Global Journey
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { img: "https://plus.unsplash.com/premium_photo-1661270430635-48b894103681?q=80&w=600&auto=format&fit=crop", title: "Visa Assistance", desc: "95% Visa success rate with meticulous documentation and interview prep." },
                            { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", title: "Course Matching", desc: "Personalized profiling to find programs that align with your long-term career goals." },
                            { img: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=600&auto=format&fit=crop", title: "Loan Guidance", desc: "Complete support for overseas education loans and financial planning assistance." },
                            { img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop", title: "Safe & Secure", desc: "24/7 on-ground legal and moral support throughout your academic stay abroad." },
                        ].map((feature, idx) => (
                            <Card key={idx} className="group overflow-hidden border-none bg-slate-50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 rounded-[40px]">
                                <div className="h-60 overflow-hidden relative">
                                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="p-8 space-y-3">
                                    <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">{feature.title}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-20 space-y-4">
                        <h2 className="text-[10px] font-black tracking-[0.3em] text-secondary uppercase bg-white inline-block px-4 py-2 rounded-full border border-slate-100 italic">Preferred Locations</h2>
                        <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">Global <span className="text-secondary italic">Destinations</span></h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
                        {destinations.map((dest) => (
                            <div key={dest.country} className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white">
                                <div className="aspect-[4/3] rounded-2xl mb-6 overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center bg-slate-50">
                                    <img src={dest.flag} alt={dest.country} className="w-full h-full object-cover p-1" />
                                </div>
                                <div className="font-black text-xl text-primary tracking-tight">{dest.country}</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{dest.students} Students</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl bg-primary rounded-3xl p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 text-center space-y-6">
                        <h3 className="text-3xl font-bold">Unsure which country to pick?</h3>
                        <p className="text-gray-300">Our senior counselors have 10+ years of experience in international education.</p>
                        <div className="flex justify-center pt-4">
                            <Link href="/contact">
                                <Button size="lg" variant="secondary" className="px-10 rounded-full">Book Free Counseling</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
