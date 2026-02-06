import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { School, Plus, Pencil, Trash2, MapPin } from "lucide-react";

export default async function AdminUniversitiesPage() {
    const universities = await prisma.university.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Universities Portfolio</h2>
                    <p className="text-sm text-slate-500">Add or manage partner university details.</p>
                </div>
                <Button className="font-bold">
                    <Plus className="w-4 h-4 mr-2" /> Add University
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((uni) => (
                    <Card key={uni.id} className="border-none shadow-sm group overflow-hidden">
                        <div className="h-24 bg-slate-100 flex items-center justify-center">
                            <School className="w-10 h-10 text-slate-300" />
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-secondary tracking-widest flex items-center mb-1">
                                        <MapPin className="w-3 h-3 mr-1" /> {uni.location}
                                    </p>
                                    <h3 className="text-lg font-bold text-slate-800">{uni.name}</h3>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                {uni.description}
                            </p>
                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                                <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Slug: {uni.slug}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
