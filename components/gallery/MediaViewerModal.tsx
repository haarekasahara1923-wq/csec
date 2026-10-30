"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Film, Image as ImageIcon } from "lucide-react";
import { extractYouTubeInfo } from "@/lib/gallery-utils";

export interface GalleryMediaItem {
    id: string;
    albumId?: string;
    title?: string | null;
    caption?: string | null;
    url: string;
    thumbnailUrl?: string | null;
    type: string;
    album?: {
        title: string;
        slug: string;
    };
}

interface MediaViewerModalProps {
    items: GalleryMediaItem[];
    currentIndex: number;
    onClose: () => void;
    onIndexChange: (newIndex: number) => void;
}

export default function MediaViewerModal({
    items,
    currentIndex,
    onClose,
    onIndexChange,
}: MediaViewerModalProps) {
    const item = items[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                if (currentIndex > 0) onIndexChange(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                if (currentIndex < items.length - 1) onIndexChange(currentIndex + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [currentIndex, items.length, onClose, onIndexChange]);

    if (!item) return null;

    const isVideo = item.type === "VIDEO";
    const yt = extractYouTubeInfo(item.url);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            {/* Top Toolbar */}
            <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
                <div className="max-w-[70%]">
                    {item.album?.title && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block">
                            {item.album.title}
                        </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                        {item.title || (isVideo ? "Video" : "Photo")}
                    </h3>
                    <span className="text-xs text-white/60">
                        {currentIndex + 1} of {items.length}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Close (Esc)"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Left Nav Button */}
            {items.length > 1 && currentIndex > 0 && (
                <button
                    onClick={() => onIndexChange(currentIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors z-20"
                    title="Previous"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}

            {/* Right Nav Button */}
            {items.length > 1 && currentIndex < items.length - 1 && (
                <button
                    onClick={() => onIndexChange(currentIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors z-20"
                    title="Next"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            {/* Main Content Area */}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-16">
                <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center">
                    {isVideo ? (
                        yt.isYouTube && yt.embedUrl ? (
                            <div className="relative w-full aspect-video max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    src={yt.embedUrl}
                                    title={item.title || "YouTube video"}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <video
                                src={item.url}
                                controls
                                autoPlay
                                className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl bg-black"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )
                    ) : (
                        <img
                            src={item.url}
                            alt={item.title || "Gallery photo"}
                            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl select-none"
                        />
                    )}
                </div>

                {/* Caption Footer */}
                {item.caption && (
                    <div className="absolute bottom-6 inset-x-0 mx-auto max-w-2xl px-6 text-center z-20">
                        <p className="text-xs sm:text-sm text-slate-200 bg-black/60 backdrop-blur-md py-2.5 px-4 rounded-xl border border-white/10 inline-block">
                            {item.caption}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
