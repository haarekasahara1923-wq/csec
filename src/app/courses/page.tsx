import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Courses Offered",
};

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({ where: { active: true } });

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <section className="bg-primary pt-16 pb-32 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Explore a wide range of undergraduate and postgraduate courses in TOP universities.
                    </p>
                </div>
            </section>

            <section className="-mt-16 pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Card key={course.id} className="hover:shadow-xl transition-all duration-300">
                                <div className="h-40 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <GraduationCap className="w-16 h-16 text-white/20" />
                                </div>
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-primary mb-4">{course.title}</h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        {course.description}
                                    </p>
                                    <Link href={`/apply?course=${encodeURIComponent(course.title)}`}>
                                        <Button variant="outline" className="w-full">
                                            Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
