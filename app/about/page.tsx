import { siteConfig } from "@/lib/config";
import { Award, Target, Eye, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-24">
            {/* Header */}
            <section className="bg-primary py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About CSEC Gwalior</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Gwalior's most trusted education consultancy, dedicated to shaping futures for over 15 years.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-primary">Who We Are</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                CSEC (Career and Student Education Consultancy) was founded with a single mission: to make quality education accessible to every aspiring student. Based in the historic city of Gwalior, we have grown into a premier consultancy hub that connects students with the Best Universities across India and the globe.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Our team of experienced counselors understands that choosing a career is one of the most significant decisions in a student's life. We provide a transparent, reliable, and supportive environment where students can explore their options without confusion.
                            </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1000&auto=format&fit=crop"
                                alt="Our Office"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 bg-slate-50 rounded-2xl text-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <Target className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                            <p className="text-gray-600">To provide accurate guidance and seamless admission processes, ensuring every student reaches their full academic potential.</p>
                        </div>
                        <div className="p-10 bg-primary text-white rounded-2xl text-center space-y-4">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                                <Eye className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold">Our Vision</h3>
                            <p className="text-gray-300">To be the global leader in educational consulting, recognized for integrity, excellence, and student-centric values.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-2xl text-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <Award className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Our Values</h3>
                            <p className="text-gray-600">Integrity, Transparency, and Commitment. We treat every student's career as our own responsibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-20 space-y-4">
                        <h2 className="text-[10px] font-black tracking-[0.3em] text-secondary uppercase bg-white inline-block px-4 py-2 rounded-full border border-slate-100">Executive Vision</h2>
                        <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">Meet Our <span className="text-secondary italic">Leadership</span></h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-20">
                        <div className="space-y-6 group">
                            <div className="w-56 h-56 bg-white rounded-full mx-auto overflow-hidden shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-500">
                                <img src="/ritesh-tiwari.jpg" alt="Ritesh Tiwari" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-3xl font-black text-primary tracking-tight">Ritesh Tiwari</h4>
                                <p className="text-secondary font-black uppercase tracking-widest text-[10px] bg-secondary/10 inline-block px-4 py-1 rounded-full">Managing Director</p>
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">Providing strategic direction and excellence in educational consulting with a student-first approach.</p>
                        </div>
                        <div className="space-y-6 group">
                            <div className="w-56 h-56 bg-white rounded-full mx-auto overflow-hidden shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-500">
                                <img src="/girraj-sharma.jpg" alt="Girraj Sharma" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-3xl font-black text-primary tracking-tight">Girraj Sharma</h4>
                                <p className="text-secondary font-black uppercase tracking-widest text-[10px] bg-secondary/10 inline-block px-4 py-1 rounded-full">Head of Counseling</p>
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">Expert in identifying student potential and aligning them with premier global academic opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
