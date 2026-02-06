import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookOpen, Plus, Pencil, Trash2, Globe } from "lucide-react";
import Link from "next/link";

export default async function AdminCoursesPage() {
    const courses = await prisma.course.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Courses Management</h2>
                    <p className="text-sm text-slate-500">Manage the list of courses offered on the website.</p>
                </div>
                <Button className="font-bold">
                    <Plus className="w-4 h-4 mr-2" /> Add New Course
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="border-none shadow-sm group">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{course.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6">
                                {course.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${course.active ? 'text-green-500' : 'text-slate-300'}`}>
                                    {course.active ? 'Active' : 'Hidden'}
                                </span>
                                <span className="text-xs text-slate-400">/{course.slug}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {courses.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-medium">No courses found. Start by adding one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
