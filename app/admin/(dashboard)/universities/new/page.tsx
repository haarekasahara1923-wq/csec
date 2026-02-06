"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { createUniversity } from "@/app/actions/universities";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewUniversityPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const name = watch("name");

    // Auto-generate slug from name
    const generateSlug = () => {
        if (name) {
            const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setValue("slug", slug);
        }
    };

    const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("slug", values.slug);
        formData.append("location", values.location);
        formData.append("description", values.description);

        const result = await createUniversity(formData);
        if (result.success) {
            router.push("/admin/universities");
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/universities"
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-500" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Add University</h2>
                        <p className="text-sm text-slate-500">Partner with a new university.</p>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">University Name</label>
                                <Input
                                    {...register("name")}
                                    placeholder="e.g. Jiwaji University"
                                    onBlur={generateSlug}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">URL Slug</label>
                                <Input {...register("slug")} placeholder="jiwaji-university" />
                                {errors.slug && (
                                    <p className="text-xs text-red-500 font-bold">{errors.slug.message}</p>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700">Location</label>
                                <Input {...register("location")} placeholder="e.g. Gwalior, MP, India" />
                                {errors.location && (
                                    <p className="text-xs text-red-500 font-bold">{errors.location.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <Textarea
                                {...register("description")}
                                placeholder="Briefly describe the university..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 font-bold">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end pt-6 border-t border-slate-50">
                            <Button type="submit" disabled={isSubmitting} className="px-8 font-bold">
                                {isSubmitting ? "Saving..." : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Save University
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
