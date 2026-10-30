"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, MoreVertical, Eye } from "lucide-react";
import Link from "next/link";
import { deleteAlbum } from "@/app/actions/gallery";
import EditAlbumModal from "./EditAlbumModal";

interface AlbumActionsProps {
    album: {
        id: string;
        slug: string;
        title: string;
        description: string | null;
        coverImage: string | null;
        active: boolean;
    };
}

export default function AlbumActions({ album }: AlbumActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteAlbum(album.id);
            if (res.success) {
                setShowConfirm(false);
                router.refresh();
            } else {
                alert(res.error || "Failed to delete album");
            }
        } catch (err: any) {
            alert(err?.message || "Failed to delete album");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            <Link
                href={`/gallery?album=${album.slug}`}
                target="_blank"
                className="p-2 text-slate-400 hover:text-secondary hover:bg-slate-50 rounded-lg transition-colors"
                title="View in Public Gallery"
            >
                <Eye className="w-4 h-4" />
            </Link>

            <EditAlbumModal album={album} />

            <button
                onClick={() => setShowConfirm(true)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Album"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Delete Album?</h4>
                        <p className="text-xs text-slate-500 mb-6">
                            Are you sure you want to delete <span className="font-bold text-slate-700">"{album.title}"</span>? All photos and videos in this album will be permanently deleted.
                        </p>
                        <div className="flex items-center justify-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors inline-flex items-center"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Yes, Delete Album"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

