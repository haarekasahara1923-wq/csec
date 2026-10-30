"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Trash2,
    Play,
    Star,
    Loader2,
    Eye,
    Film,
    Image as ImageIcon,
    ExternalLink
} from "lucide-react";
import { deleteGalleryItem, setAlbumCover } from "@/app/actions/gallery";
import { extractYouTubeInfo } from "@/lib/gallery-utils";

interface MediaItemCardProps {
    item: {
        id: string;
        albumId: string;
        title: string | null;
        caption: string | null;
        url: string;
        thumbnailUrl: string | null;
        type: string;
        createdAt: Date;
    };
    isCover: boolean;
    onPreview: (item: any) => void;
}

export default function MediaItemCard({ item, isCover, onPreview }: MediaItemCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSettingCover, setIsSettingCover] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const router = useRouter();

    const isVideo = item.type === "VIDEO";
    const ytInfo = extractYouTubeInfo(item.url);
    const displayThumbnail = item.thumbnailUrl || (isVideo ? (ytInfo.thumbnailUrl || null) : item.url);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteGalleryItem(item.id);
            if (res.success) {
                setShowDeleteConfirm(false);
                router.refresh();
            } else {
                alert(res.error || "Failed to delete item");
            }
        } catch (err: any) {
            alert(err?.message || "Failed to delete item");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSetCover = async () => {
        const coverUrl = displayThumbnail || item.url;
        setIsSettingCover(true);
        try {
            const res = await setAlbumCover(item.albumId, coverUrl);
            if (res.success) {
                router.refresh();
            } else {
                alert(res.error || "Failed to set album cover");
            }
        } catch (err: any) {
            alert(err?.message || "Failed to set album cover");
        } finally {
            setIsSettingCover(false);
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
            {/* Thumbnail Box */}
            <div
                className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => onPreview(item)}
            >
                {displayThumbnail ? (
                    <img
                        src={displayThumbnail}
                        alt={item.title || "Gallery Item"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                        {isVideo ? <Film className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                )}

                {/* Video Play Overlay */}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-11 h-11 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                    </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm ${
                            isVideo
                                ? "bg-amber-500 text-white"
                                : "bg-primary text-white"
                        }`}
                    >
                        {isVideo ? "Video" : "Photo"}
                    </span>
                    {isCover && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm bg-secondary text-primary flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Cover
                        </span>
                    )}
                </div>

                {/* Quick preview hover button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> View
                    </span>
                </div>
            </div>

            {/* Info and Actions */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                    <h5 className="font-bold text-slate-800 text-sm line-clamp-1">
                        {item.title || (isVideo ? "Untitled Video" : "Untitled Photo")}
                    </h5>
                    {item.caption && (
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {item.caption}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                    {!isCover && (
                        <button
                            type="button"
                            onClick={handleSetCover}
                            disabled={isSettingCover}
                            className="text-[11px] font-bold text-slate-500 hover:text-secondary flex items-center gap-1 transition-colors"
                            title="Make this photo the album cover"
                        >
                            {isSettingCover ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Star className="w-3 h-3" />
                            )}
                            Set Cover
                        </button>
                    )}
                    {isCover && (
                        <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Album Cover
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors ml-auto"
                        title="Delete this photo/video"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Confirm Delete Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-100 text-center">
                        <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-slate-800 mb-1">Delete Media?</h4>
                        <p className="text-xs text-slate-500 mb-4">
                            Are you sure you want to delete this {isVideo ? "video" : "photo"} from the album?
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl inline-flex items-center"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Yes, Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
