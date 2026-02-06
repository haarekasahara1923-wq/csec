import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { School, MapPin, Globe } from "lucide-react";

export const metadata = {
    title: "Universities & Colleges",
};

export default async function UniversitiesPage() {
    const universities = await prisma.university.findMany({ where: { active: true } });

    return (
        <div className="pt-24 min-h-screen bg-white">
            <section className="bg-slate-50 py-20 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Partner Universities</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        We are official partners with leading universities across India and abroad.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {universities.map((uni) => (
                            <Card key={uni.id} className="flex flex-col md:flex-row items-stretch border-none bg-slate-50 overflow-hidden group">
                                <div className="md:w-1/3 bg-gray-200 min-h-[200px] relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <School className="w-16 h-16 text-gray-400" />
                                    </div>
                                </div>
                                <CardContent className="md:w-2/3 p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2 text-secondary font-bold text-sm mb-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{uni.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-primary mb-3">{uni.name}</h3>
                                        <p className="text-gray-600 mb-6 line-clamp-3">
                                            {uni.description}
                                        </p>
                                    </div>
                                    <Link href={`/apply?university=${encodeURIComponent(uni.name)}`}>
                                        <Button className="w-fit">Get Admission Info</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-24 p-12 bg-primary rounded-3xl text-white flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-8 md:mb-0 space-y-2">
                            <h4 className="text-3xl font-bold italic text-secondary">Looking for something else?</h4>
                            <p className="text-gray-300">We have partnerships with 150+ other private and government colleges.</p>
                        </div>
                        <Link href="/contact">
                            <Button size="lg" variant="secondary" className="px-12 rounded-full">Explore More</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
