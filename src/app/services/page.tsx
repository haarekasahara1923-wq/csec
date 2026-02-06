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
            details: ["Aptitude Assessment", "Interest Mapping", "Parent-Student Guidance", "Industry Trends Briefing"]
        },
        {
            id: "admission",
            icon: School,
            title: "Direct Admission Guidance",
            desc: "We simplify the complex admission process for various UG/PG courses like MBBS, B.Tech, MBA, etc., in top government and private universities.",
            details: ["Form Filling Support", "Document Verification", "Seat Allocation Guidance", "Quota Eligibility Check"]
        },
        {
            id: "study-abroad",
            icon: Globe,
            title: "Study Abroad Consultancy",
            desc: "Unlock global opportunities with our overseas education services. We help you choose the right country, university, and course that fits your budget.",
            details: ["Country Selection", "Visa Interview Prep", "Statement of Purpose (SOP)", "Pre-departure Briefing"]
        },
        {
            id: "placement",
            icon: Briefcase,
            title: "Placement Preparation",
            desc: "We don't just stop at admission. We provide resources and guidance to help students prepare for campus placements and off-campus opportunities.",
            details: ["Resume Building", "Interview Skills", "Soft Skills Training", "Mock Sessions"]
        }
    ];

    return (
        <div className="pt-24">
            <section className="bg-primary py-24 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-300">End-to-end educational support designed for your success.</p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="space-y-24">
                        {services.map((service, idx) => (
                            <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`} id={service.id}>
                                <div className="lg:w-1/2 space-y-8">
                                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl font-bold text-primary">{service.title}</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{service.desc}</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.details.map((detail, i) => (
                                            <li key={i} className="flex items-center space-x-2 text-gray-700 font-medium">
                                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        <Link href="/contact">
                                            <Button size="lg" className="px-10">Enquire Now</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 w-full aspect-video bg-slate-50 rounded-3xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center">
                                    <service.icon className="w-32 h-32 text-primary/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
