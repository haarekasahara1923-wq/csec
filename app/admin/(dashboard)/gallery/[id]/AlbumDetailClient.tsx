"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Image as ImageIcon,
    Film,
    Filter,
    ExternalLink,
    Folder,
    UploadCloud,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import AddMediaModal from "@/components/admin/AddMediaModal";
import EditAlbumModal from "@/components/admin/EditAlbumModal";
import MediaItemCard from "@/components/admin/MediaItemCard";
import MediaViewerModal from "@/components/gallery/MediaViewerModal";

interface AlbumDetailClientProps {
    album: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        active: boolean;
        createdAt: Date;
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
    };
}

export default function AlbumDetailClient({ album }: AlbumDetailClientProps) {
    const [filter, setFilter] = useState<"ALL" | "IMAGE" | "VIDEO">("ALL");
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    const photos = album.items.filter((i) => i.type === "IMAGE");
    const videos = album.items.filter((i) => i.type === "VIDEO");

    const filteredItems = album.items.filter((item) => {
        if (filter === "IMAGE") return item.type === "IMAGE";
        if (filter === "VIDEO") return item.type === "VIDEO";
        return true;
    });

    const handlePreviewItem = (item: any) => {
        const idx = filteredItems.findIndex((i) => i.id === item.id);
        if (idx !== -1) {
            setPreviewIndex(idx);
        }
    };

    return (
        <div className="space-y-8">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                    <Link
                        href="/admin/gallery"
                        className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-primary rounded-xl transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">Gallery Albums</span>
                            <span className="text-xs text-slate-300">/</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${album.active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
                                {album.active ? "Live" : "Draft"}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">{album.title}</h2>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Link
                        href={`/gallery?album=${album.slug}`}
                        target="_blank"
                    >
                        <Button variant="outline" className="text-xs font-bold border-slate-200 hover:bg-slate-50">
                            <ExternalLink className="w-4 h-4 mr-1.5" /> View Public Page
                        </Button>
                    </Link>
                    <EditAlbumModal album={album} />
                    <AddMediaModal albumId={album.id} albumTitle={album.title} />
                </div>
            </div>

            {/* Album Header Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group">
                    {album.coverImage ? (
                        <img
                            src={album.coverImage}
                            alt={album.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                            <ImageIcon className="w-8 h-8 mb-1" />
                            <span className="text-[11px] font-bold">No Cover Image</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">
                            <ImageIcon className="w-3.5 h-3.5 text-primary" />
                            <span>{photos.length} Photos</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">
                            <Film className="w-3.5 h-3.5 text-secondary" />
                            <span>{videos.length} Videos</span>
                        </div>
                        <div className="text-xs text-slate-400">
                            Slug: <span className="font-mono text-slate-600">/{album.slug}</span>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {album.description || "No description provided for this album. Click 'Edit Album' to add one."}
                    </p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setFilter("ALL")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            filter === "ALL"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        All Media ({album.items.length})
                    </button>
                    <button
                        onClick={() => setFilter("IMAGE")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            filter === "IMAGE"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Photos ({photos.length})
                    </button>
                    <button
                        onClick={() => setFilter("VIDEO")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            filter === "VIDEO"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        <Film className="w-3.5 h-3.5" />
                        Videos ({videos.length})
                    </button>
                </div>

                <div className="text-xs font-bold text-slate-400 hidden sm:block">
                    Showing {filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}
                </div>
            </div>

            {/* Media Items Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <MediaItemCard
                            key={item.id}
                            item={item}
                            isCover={album.coverImage === item.url || album.coverImage === item.thumbnailUrl}
                            onPreview={handlePreviewItem}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-4">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto">
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-bold text-slate-700">No media in this album yet</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Upload high-res event photos, campus tour videos, or paste YouTube links to showcase here.
                        </p>
                    </div>
                    <div>
                        <AddMediaModal albumId={album.id} albumTitle={album.title} />
                    </div>
                </div>
            )}

            {/* Lightbox / Video Player Modal */}
            {previewIndex !== null && (
                <MediaViewerModal
                    items={filteredItems.map((i) => ({
                        id: i.id,
                        title: i.title,
                        caption: i.caption,
                        url: i.url,
                        thumbnailUrl: i.thumbnailUrl,
                        type: i.type,
                        album: {
                            title: album.title,
                            slug: album.slug,
                        },
                    }))}
                    currentIndex={previewIndex}
                    onClose={() => setPreviewIndex(null)}
                    onIndexChange={(idx) => setPreviewIndex(idx)}
                />
            )}
        </div>
    );
}

