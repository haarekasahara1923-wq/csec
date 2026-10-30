import prisma from "@/lib/prisma";
import Link from "next/link";
import {
    Images,
    Image as ImageIcon,
    Film,
    FolderPlus,
    ExternalLink,
    ChevronRight,
    Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import CreateAlbumModal from "@/components/admin/CreateAlbumModal";
import AlbumActions from "@/components/admin/AlbumActions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
    const albums = await prisma.galleryAlbum.findMany({
        include: {
            items: true,
        },
        orderBy: { createdAt: "desc" },
    });

    const totalAlbums = albums.length;
    let totalPhotos = 0;
    let totalVideos = 0;

    albums.forEach((album: any) => {
        album.items.forEach((item: any) => {
            if (item.type === "VIDEO") {
                totalVideos++;
            } else {
                totalPhotos++;
            }
        });
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Gallery & Album Management</h2>
                    <p className="text-sm text-slate-500">
                        Create albums and manage photos and videos for the public gallery page.
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Link href="/gallery" target="_blank">
                        <Button variant="outline" className="text-xs font-bold border-slate-200">
                            <ExternalLink className="w-4 h-4 mr-1.5" /> View Public Gallery
                        </Button>
                    </Link>
                    <CreateAlbumModal />
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Images className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Albums</span>
                            <h4 className="text-2xl font-black text-slate-800">{totalAlbums}</h4>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Photos</span>
                            <h4 className="text-2xl font-black text-slate-800">{totalPhotos}</h4>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <Film className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Videos</span>
                            <h4 className="text-2xl font-black text-slate-800">{totalVideos}</h4>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Album Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Albums ({albums.length})</h3>
                    <span className="text-xs text-slate-400">Click any album to view and add photos/videos</span>
                </div>

                {albums.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {albums.map((album: any) => {
                            const photoCount = album.items.filter((i: any) => i.type === "IMAGE").length;
                            const videoCount = album.items.filter((i: any) => i.type === "VIDEO").length;

                            return (
                                <Card
                                    key={album.id}
                                    className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Cover Image */}
                                        <Link href={`/admin/gallery/${album.id}`} className="block relative aspect-video bg-slate-100 overflow-hidden">
                                            {album.coverImage ? (
                                                <img
                                                    src={album.coverImage}
                                                    alt={album.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 group-hover:text-slate-400 transition-colors">
                                                    <Images className="w-10 h-10 mb-2" />
                                                    <span className="text-xs font-bold">No Cover Image</span>
                                                </div>
                                            )}

                                            <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                                <span
                                                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm ${
                                                        album.active
                                                            ? "bg-emerald-500/90 text-white"
                                                            : "bg-slate-700/90 text-slate-200"
                                                    }`}
                                                >
                                                    {album.active ? "Published" : "Draft"}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                                                    <ImageIcon className="w-3 h-3" /> {photoCount}
                                                </span>
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                                                    <Film className="w-3 h-3 text-secondary" /> {videoCount}
                                                </span>
                                            </div>
                                        </Link>

                                        {/* Card Body */}
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <Link href={`/admin/gallery/${album.id}`} className="flex-1">
                                                    <h4 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                                                        {album.title}
                                                    </h4>
                                                </Link>
                                                <AlbumActions album={album} />
                                            </div>

                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[2rem]">
                                                {album.description || "No description provided."}
                                            </p>
                                        </CardContent>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-5 pb-5 pt-0">
                                        <Link
                                            href={`/admin/gallery/${album.id}`}
                                            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-primary hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            <span>Manage Photos & Videos</span>
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-4">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto">
                            <Images className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-bold text-slate-800">No Gallery Albums Found</h4>
                            <p className="text-xs text-slate-500 max-w-md mx-auto">
                                Create your first album (such as Campus Events, Convocation, Seminars, or Campus Tour) to start adding photos and videos!
                            </p>
                        </div>
                        <div className="pt-2">
                            <CreateAlbumModal />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
