import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PublicGalleryClient from "@/components/gallery/PublicGalleryClient";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GraduationCap, ArrowRight, Camera, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Campus & Event Gallery | Photos & Videos",
    description: "Explore campus tours, career counseling seminars, university visits, student success stories, and convocation events at CSEC Gwalior.",
    openGraph: {
        title: "Campus & Event Gallery | CSEC Gwalior",
        description: "Explore photos and videos of college visits, student counseling seminars, and life at CSEC.",
    },
};

export default async function PublicGalleryPage({
    searchParams,
}: {
    searchParams: { album?: string };
}) {
    const albums = await prisma.galleryAlbum.findMany({
        where: { active: true },
        include: {
            items: {
                orderBy: { createdAt: "desc" },
            },
        },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return (
        <div className="pt-24 min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="relative bg-primary py-24 text-white overflow-hidden">
                {/* Background decorative glows */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-secondary text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Media & Moments</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                        Life at <span className="text-secondary">CSEC</span> & Campus Tours
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Experience our university seminars, student counseling sessions, campus visits, and academic milestones captured in photos and videos.
                    </p>
                </div>
            </section>

            {/* Gallery Main Container */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <PublicGalleryClient
                        albums={albums}
                        initialAlbum={searchParams.album}
                    />
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="py-20 bg-gradient-to-r from-primary via-slate-900 to-primary text-white border-t border-white/10">
                <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
                    <div className="w-14 h-14 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Ready to Start Your University Journey?
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Connect with our certified education counselors for end-to-end guidance in engineering, medical, management, and overseas admissions.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/apply">
                            <Button className="bg-secondary text-primary hover:bg-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-2xl shadow-xl shadow-secondary/20 transition-all">
                                Apply For Admission <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-2xl transition-all">
                                Contact Counselor
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
