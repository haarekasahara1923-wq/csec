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
import { createCourse } from "@/app/actions/courses";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewCoursePage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            active: true,
        },
    });

    const title = watch("title");

    // Auto-generate slug from title
    const generateSlug = () => {
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setValue("slug", slug);
        }
    };

    const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("description", values.description);
        formData.append("active", String(values.active));

        const result = await createCourse(formData);
        if (result.success) {
            router.push("/admin/courses");
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/admin/courses"
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-500" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Add New Course</h2>
                        <p className="text-sm text-slate-500">Create a new course entry for the website.</p>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Course Title</label>
                                <Input
                                    {...register("title")}
                                    placeholder="e.g. MBBS Abroad"
                                    onBlur={generateSlug}
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500 font-bold">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">URL Slug</label>
                                <Input {...register("slug")} placeholder="mbbs-abroad" />
                                {errors.slug && (
                                    <p className="text-xs text-red-500 font-bold">{errors.slug.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <Textarea
                                {...register("description")}
                                placeholder="Detailed description of the course..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 font-bold">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="active"
                                {...register("active")}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="active" className="text-sm font-bold text-slate-700">
                                Visible to users
                            </label>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-slate-50">
                            <Button type="submit" disabled={isSubmitting} className="px-8 font-bold">
                                {isSubmitting ? "Saving..." : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Save Course
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
