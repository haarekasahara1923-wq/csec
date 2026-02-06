import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Globe, Plane, GraduationCap, ShieldCheck, Landmark } from "lucide-react";

export const metadata = {
    title: "Study Abroad Consultancy | Global Education",
};

export default function StudyAbroadPage() {
    const destinations = [
        { country: "USA", students: "500+", flag: "🇺🇸" },
        { country: "Canada", students: "400+", flag: "🇨🇦" },
        { country: "UK", students: "350+", flag: "🇬🇧" },
        { country: "Australia", students: "250+", flag: "🇦🇺" },
        { country: "Germany", students: "200+", flag: "🇩🇪" },
        { country: "Philippines", students: "100+", flag: "🇵🇭" },
    ];

    return (
        <div className="pt-24 min-h-screen">
            <section className="relative h-[80vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="container mx-auto px-4 relative z-10 text-white space-y-8">
                    <div className="inline-block px-4 py-2 bg-secondary text-primary font-bold text-sm rounded-full">GLOBAL EDUCATION</div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">Your Dreams Know <br /><span className="text-secondary">No Borders.</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl">Complete end-to-end support for international admissions in 20+ countries.</p>
                    <div className="pt-8">
                        <Link href="/apply">
                            <Button size="lg" variant="secondary" className="px-12 h-16 text-lg rounded-full font-bold">Start Global Journey</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Plane, title: "Visa Assistance", desc: "95% Visa success rate with meticulous documentation." },
                            { icon: GraduationCap, title: "Course Matching", desc: "Finding programs that align with your career goals." },
                            { icon: Landmark, title: "Loan Guidance", desc: "Support for education loans and financial planning." },
                            { icon: ShieldCheck, title: "Safe & Secure", desc: "Legal and moral support throughout your stay abroad." },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 text-center space-y-4 border rounded-2xl hover:border-secondary transition-colors group">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-primary group-hover:bg-secondary transition-colors">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold text-primary">{feature.title}</h4>
                                <p className="text-gray-500 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-primary mb-2">Our Destinations</h2>
                    <p className="text-gray-500 mb-16">Preferred study destinations for our students.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {destinations.map((dest) => (
                            <div key={dest.country} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{dest.flag}</div>
                                <div className="font-bold text-primary">{dest.country}</div>
                                <div className="text-xs text-gray-400 mt-2">{dest.students} Students</div>
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
