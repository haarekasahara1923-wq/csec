"use client";

import { useState, useMemo } from "react";
import {
    Image as ImageIcon,
    Film,
    Sparkles,
    Folder,
    Play,
    Eye,
    Layers,
    ChevronRight,
    Youtube
} from "lucide-react";
import MediaViewerModal from "./MediaViewerModal";
import { extractYouTubeInfo } from "@/lib/gallery-utils";

interface PublicGalleryClientProps {
    albums: Array<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        items: Array<{
            id: string;
            albumId: string;
            title: string | null;
            caption: string | null;
            url: string;
            thumbnailUrl: string | null;
            type: string;
            createdAt: Date;
        }>;
    }>;
    initialAlbum?: string;
}

export default function PublicGalleryClient({
    albums,
    initialAlbum,
}: PublicGalleryClientProps) {
    const [selectedAlbum, setSelectedAlbum] = useState<string>(initialAlbum || "all");
    const [mediaType, setMediaType] = useState<"ALL" | "IMAGE" | "VIDEO">("ALL");
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    // Calculate all items with album info attached
    const allItems = useMemo(() => {
        const list: Array<any> = [];
        albums.forEach((album) => {
            album.items.forEach((item) => {
                list.push({
                    ...item,
                    album: {
                        id: album.id,
                        title: album.title,
                        slug: album.slug,
                    },
                });
            });
        });
        return list;
    }, [albums]);

    // Filter items based on selected album and media type
    const filteredItems = useMemo(() => {
        return allItems.filter((item) => {
            const matchesAlbum =
                selectedAlbum === "all" || item.album.slug === selectedAlbum;
            const matchesType =
                mediaType === "ALL" || item.type === mediaType;
            return matchesAlbum && matchesType;
        });
    }, [allItems, selectedAlbum, mediaType]);

    // Active album object (if an album is selected)
    const activeAlbumObj = useMemo(() => {
        if (selectedAlbum === "all") return null;
        return albums.find((a) => a.slug === selectedAlbum) || null;
    }, [albums, selectedAlbum]);

    // Counts
    const totalPhotos = allItems.filter((i) => i.type === "IMAGE").length;
    const totalVideos = allItems.filter((i) => i.type === "VIDEO").length;

    const currentAlbumPhotos = activeAlbumObj
        ? activeAlbumObj.items.filter((i) => i.type === "IMAGE").length
        : totalPhotos;
    const currentAlbumVideos = activeAlbumObj
        ? activeAlbumObj.items.filter((i) => i.type === "VIDEO").length
        : totalVideos;

    return (
        <div className="space-y-12">
            {/* Filter Controls Bar */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-primary/5 border border-slate-100 space-y-6">
                {/* Album Selection Pills */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-secondary" /> Select Album
                        </span>
                        {selectedAlbum !== "all" && (
                            <button
                                onClick={() => setSelectedAlbum("all")}
                                className="text-xs font-bold text-secondary hover:underline"
                            >
                                View All Albums
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={() => setSelectedAlbum("all")}
                            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                                selectedAlbum === "all"
                                    ? "bg-primary text-secondary shadow-lg shadow-primary/20 scale-105"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            All Albums ({allItems.length})
                        </button>

                        {albums.map((album) => {
                            const isSelected = selectedAlbum === album.slug;
                            return (
                                <button
                                    key={album.id}
                                    onClick={() => setSelectedAlbum(album.slug)}
                                    className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                        isSelected
                                            ? "bg-primary text-secondary shadow-lg shadow-primary/20 scale-105"
                                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    <Folder className={`w-3.5 h-3.5 ${isSelected ? "text-secondary" : "text-slate-400"}`} />
                                    <span>{album.title}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                                        {album.items.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sub-bar: Type selector & Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Media Type Toggle */}
                    <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl">
                        <button
                            onClick={() => setMediaType("ALL")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                mediaType === "ALL"
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            All ({selectedAlbum === "all" ? allItems.length : activeAlbumObj?.items.length || 0})
                        </button>
                        <button
                            onClick={() => setMediaType("IMAGE")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                mediaType === "IMAGE"
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <ImageIcon className="w-3.5 h-3.5 text-primary" />
                            Photos ({currentAlbumPhotos})
                        </button>
                        <button
                            onClick={() => setMediaType("VIDEO")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                mediaType === "VIDEO"
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <Film className="w-3.5 h-3.5 text-secondary" />
                            Videos ({currentAlbumVideos})
                        </button>
                    </div>

                    {/* Active album details indicator */}
                    {activeAlbumObj && (
                        <div className="text-right">
                            <h4 className="text-sm font-bold text-slate-800">{activeAlbumObj.title}</h4>
                            {activeAlbumObj.description && (
                                <p className="text-xs text-slate-500 max-w-md line-clamp-1">
                                    {activeAlbumObj.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* If All Albums selected and there are multiple albums, show Album Highlights Shelf */}
            {selectedAlbum === "all" && albums.length > 1 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-secondary" />
                            Featured Albums
                        </h3>
                        <span className="text-xs text-slate-400">Click any album to explore its media</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {albums.map((album) => {
                            const pCount = album.items.filter((i) => i.type === "IMAGE").length;
                            const vCount = album.items.filter((i) => i.type === "VIDEO").length;

                            return (
                                <div
                                    key={album.id}
                                    onClick={() => setSelectedAlbum(album.slug)}
                                    className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-primary/10 border border-slate-100 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
                                >
                                    <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                                        {album.coverImage ? (
                                            <img
                                                src={album.coverImage}
                                                alt={album.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.95]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-800">
                                                <Folder className="w-10 h-10 mb-2" />
                                                <span className="text-xs font-bold">Album</span>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h4 className="text-lg font-bold leading-tight group-hover:text-secondary transition-colors line-clamp-1">
                                                {album.title}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-300 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <ImageIcon className="w-3.5 h-3.5 text-secondary" /> {pCount} Photos
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Film className="w-3.5 h-3.5 text-secondary" /> {vCount} Videos
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {album.description && (
                                        <div className="p-4 bg-white">
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {album.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Media Items Masonry / Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                        {selectedAlbum === "all" ? "All Moments" : activeAlbumObj?.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Showing {filteredItems.length} Media Item{filteredItems.length === 1 ? "" : "s"}
                    </span>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredItems.map((item, index) => {
                            const isVideo = item.type === "VIDEO";
                            const yt = extractYouTubeInfo(item.url);
                            const displayThumbnail = item.thumbnailUrl || (isVideo ? yt.thumbnailUrl : item.url);

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setPreviewIndex(index)}
                                    className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-primary/15 border border-slate-100 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
                                >
                                    {/* Media Thumbnail */}
                                    <div className="relative aspect-video sm:aspect-square w-full bg-slate-900 overflow-hidden">
                                        {displayThumbnail ? (
                                            <img
                                                src={displayThumbnail}
                                                alt={item.title || "Gallery Item"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-800">
                                                {isVideo ? <Film className="w-10 h-10" /> : <ImageIcon className="w-10 h-10" />}
                                            </div>
                                        )}

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                                            <span
                                                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md ${
                                                    isVideo
                                                        ? "bg-amber-500/90 text-white"
                                                        : "bg-primary/90 text-white"
                                                }`}
                                            >
                                                {isVideo ? (
                                                    <span className="flex items-center gap-1">
                                                        {yt.isYouTube ? <Youtube className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                                                        Video
                                                    </span>
                                                ) : (
                                                    "Photo"
                                                )}
                                            </span>
                                        </div>

                                        {/* Video Play Button Overlay */}
                                        {isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="w-14 h-14 rounded-full bg-secondary text-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                                    <Play className="w-6 h-6 ml-1 fill-current" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Hover Eye indicator for Photos */}
                                        {!isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-xl backdrop-blur-sm">
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Tag within Thumbnail */}
                                        <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-secondary block mb-1">
                                                {item.album?.title}
                                            </span>
                                            {item.title && (
                                                <h4 className="text-sm font-bold truncate text-white drop-shadow-sm">
                                                    {item.title}
                                                </h4>
                                            )}
                                        </div>
                                    </div>

                                    {/* Caption Box */}
                                    {item.caption && (
                                        <div className="p-4 bg-white border-t border-slate-50">
                                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                                {item.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-4">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-bold text-slate-800">No media found</h4>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                No photos or videos found matching the current filter. Try selecting "All Albums" or "All Media".
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSelectedAlbum("all");
                                    setMediaType("ALL");
                                }}
                                className="px-6 py-2.5 bg-primary text-secondary text-xs font-black uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-md"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Media Lightbox / Fullscreen Video Player */}
            {previewIndex !== null && (
                <MediaViewerModal
                    items={filteredItems}
                    currentIndex={previewIndex}
                    onClose={() => setPreviewIndex(null)}
                    onIndexChange={(idx) => setPreviewIndex(idx)}
                />
            )}
        </div>
    );
}

