"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateAlbum } from "@/app/actions/gallery";

interface EditAlbumModalProps {
    album: {
        id: string;
        title: string;
        description: string | null;
        coverImage: string | null;
        active: boolean;
    };
}

export default function EditAlbumModal({ album }: EditAlbumModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description || "");
    const [coverImage, setCoverImage] = useState(album.coverImage || "");
    const [active, setActive] = useState(album.active);
    const [loading, setLoading] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingCover(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/gallery/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setCoverImage(data.url);
            } else {
                setError(data.error || "Failed to upload cover image");
            }
        } catch (err: any) {
            setError(err?.message || "Error uploading file");
        } finally {
            setUploadingCover(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Album title is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await updateAlbum(album.id, {
                title: title.trim(),
                description: description.trim() || undefined,
                coverImage: coverImage.trim() || undefined,
                active,
            });

            if (res.error) {
                setError(res.error);
            } else {
                setIsOpen(false);
                router.refresh();
            }
        } catch (err: any) {
            setError(err?.message || "Failed to update album");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                title="Edit Album"
            >
                <Pencil className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden text-left">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Edit Album</h3>
                                <p className="text-xs text-slate-400">Update title, description, or cover image</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Album Title *
                                </label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Cover Image URL
                                </label>
                                <div className="space-y-3">
                                    <Input
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        placeholder="Paste image URL..."
                                        className="text-xs font-medium"
                                    />

                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors">
                                            <ImageIcon className="w-4 h-4 mr-2 text-slate-500" />
                                            {uploadingCover ? "Uploading Cover..." : "Upload New Cover"}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleCoverFileUpload}
                                                disabled={uploadingCover}
                                            />
                                        </label>
                                    </div>

                                    {coverImage && (
                                        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                            <img
                                                src={coverImage}
                                                alt="Cover preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setCoverImage("")}
                                                className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 pt-2">
                                <label className="flex items-center space-x-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={active}
                                        onChange={(e) => setActive(e.target.checked)}
                                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                                    />
                                    <span className="text-sm font-bold text-slate-700">Publish album on public gallery</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading || uploadingCover}
                                    className="bg-primary text-white font-bold"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
