"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    X,
    UploadCloud,
    Link as LinkIcon,
    Image as ImageIcon,
    Video as VideoIcon,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Youtube
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { addGalleryItem } from "@/app/actions/gallery";
import { extractYouTubeInfo } from "@/lib/gallery-utils";

interface AddMediaModalProps {
    albumId: string;
    albumTitle: string;
}

export default function AddMediaModal({ albumId, albumTitle }: AddMediaModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<"file" | "url">("file");
    const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO">("IMAGE");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    // Files state for upload
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string>("");
    const [error, setError] = useState("");
    const [successCount, setSuccessCount] = useState<number | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(filesArray);

            // Auto-detect type based on first file
            const first = filesArray[0];
            if (first.type.startsWith("video/") || /\.(mp4|webm|mov|mkv|avi)$/i.test(first.name)) {
                setMediaType("VIDEO");
            } else {
                setMediaType("IMAGE");
            }
        }
    };

    const handleUrlChange = (val: string) => {
        setUrl(val);
        const yt = extractYouTubeInfo(val);
        if (yt.isYouTube) {
            setMediaType("VIDEO");
            if (yt.thumbnailUrl) {
                setThumbnailUrl(yt.thumbnailUrl);
            }
        } else if (/\.(mp4|webm|mov|mkv|avi)$/i.test(val)) {
            setMediaType("VIDEO");
        }
    };

    const resetForm = () => {
        setTitle("");
        setCaption("");
        setUrl("");
        setThumbnailUrl("");
        setSelectedFiles([]);
        setError("");
        setSuccessCount(null);
        setUploadProgress("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setUploading(true);

        try {
            if (mode === "url") {
                if (!url.trim()) {
                    setError("Please enter a media URL or YouTube link");
                    setUploading(false);
                    return;
                }

                const res = await addGalleryItem({
                    albumId,
                    title: title.trim() || undefined,
                    caption: caption.trim() || undefined,
                    url: url.trim(),
                    thumbnailUrl: thumbnailUrl.trim() || undefined,
                    type: mediaType,
                });

                if (res.error) {
                    setError(res.error);
                } else {
                    resetForm();
                    setIsOpen(false);
                    router.refresh();
                }
            } else {
                // File upload mode
                if (selectedFiles.length === 0) {
                    setError("Please select at least one photo or video file");
                    setUploading(false);
                    return;
                }

                let completed = 0;
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    setUploadProgress(`Uploading ${i + 1} of ${selectedFiles.length}: ${file.name}...`);

                    const formData = new FormData();
                    formData.append("file", file);

                    const uploadRes = await fetch("/api/gallery/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!uploadRes.ok) {
                        const errData = await uploadRes.json().catch(() => ({}));
                        throw new Error(errData.error || `Upload failed for ${file.name}`);
                    }

                    const uploadData = await uploadRes.json();

                    // Create item in DB
                    const itemTitle = selectedFiles.length === 1 && title.trim() ? title.trim() : file.name.replace(/\.[^/.]+$/, "");
                    const itemCaption = selectedFiles.length === 1 && caption.trim() ? caption.trim() : undefined;

                    await addGalleryItem({
                        albumId,
                        title: itemTitle,
                        caption: itemCaption,
                        url: uploadData.url,
                        thumbnailUrl: uploadData.thumbnailUrl,
                        type: uploadData.mediaType || mediaType,
                    });

                    completed++;
                }

                setSuccessCount(completed);
                resetForm();
                setTimeout(() => {
                    setIsOpen(false);
                    router.refresh();
                }, 1000);
            }
        } catch (err: any) {
            console.error("Add media error:", err);
            setError(err?.message || "Failed to add media item(s)");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => {
                    resetForm();
                    setIsOpen(true);
                }}
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md hover:shadow-lg transition-all"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Photos & Videos
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden text-left">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Add to "{albumTitle}"</h3>
                                <p className="text-xs text-slate-400">Upload photos, videos, or paste YouTube/media links</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex p-2 bg-slate-100/80 m-6 mb-2 rounded-2xl gap-2">
                            <button
                                type="button"
                                onClick={() => setMode("file")}
                                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                    mode === "file"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <UploadCloud className="w-4 h-4" />
                                File Upload (Device)
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("url")}
                                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                    mode === "url"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <LinkIcon className="w-4 h-4" />
                                URL / YouTube Link
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4 max-h-[75vh] overflow-y-auto">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium border border-red-100 flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {successCount !== null && (
                                <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl font-bold border border-green-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>Successfully added {successCount} media item(s)! Updating...</span>
                                </div>
                            )}

                            {/* Type selector */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Media Category
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setMediaType("IMAGE")}
                                        className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                            mediaType === "IMAGE"
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                        }`}
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        Photo (Image)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMediaType("VIDEO")}
                                        className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                            mediaType === "VIDEO"
                                                ? "border-secondary bg-secondary/10 text-primary"
                                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                        }`}
                                    >
                                        <VideoIcon className="w-4 h-4 text-secondary" />
                                        Video
                                    </button>
                                </div>
                            </div>

                            {/* File Upload Box */}
                            {mode === "file" && (
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                        Select Files (Images or Videos) *
                                    </label>
                                    <label className="border-2 border-dashed border-slate-200 hover:border-primary/50 hover:bg-slate-50/50 transition-all rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer text-center group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 text-primary flex items-center justify-center mb-3 transition-colors">
                                            <UploadCloud className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">
                                            Click to browse or drag & drop files
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1">
                                            Supports JPG, PNG, WEBP, MP4, WEBM, MOV (multi-select allowed)
                                        </span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            disabled={uploading}
                                        />
                                    </label>

                                    {selectedFiles.length > 0 && (
                                        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-slate-700 block mb-1">
                                                Selected {selectedFiles.length} file(s):
                                            </span>
                                            <div className="max-h-24 overflow-y-auto space-y-1 text-xs text-slate-500">
                                                {selectedFiles.map((f, i) => (
                                                    <div key={i} className="flex justify-between items-center text-[11px]">
                                                        <span className="truncate max-w-[80%]">{f.name}</span>
                                                        <span className="text-slate-400">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* URL Input Box */}
                            {mode === "url" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                            Media URL or YouTube Link *
                                        </label>
                                        <Input
                                            value={url}
                                            onChange={(e) => handleUrlChange(e.target.value)}
                                            placeholder="https://... or https://youtube.com/watch?v=..."
                                            required
                                            className="text-xs font-medium"
                                        />
                                        <span className="text-[11px] text-slate-400 mt-1 block">
                                            Paste any image link, MP4 link, or YouTube video/shorts URL.
                                        </span>
                                    </div>

                                    {extractYouTubeInfo(url).isYouTube && (
                                        <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-2 text-xs font-bold">
                                            <Youtube className="w-4 h-4 text-red-600" />
                                            <span>Detected YouTube Video! Video player & thumbnail will be auto-generated.</span>
                                        </div>
                                    )}

                                    {mediaType === "VIDEO" && !extractYouTubeInfo(url).isYouTube && (
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                                Video Poster / Thumbnail URL (Optional)
                                            </label>
                                            <Input
                                                value={thumbnailUrl}
                                                onChange={(e) => setThumbnailUrl(e.target.value)}
                                                placeholder="https://.../thumbnail.jpg"
                                                className="text-xs font-medium"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Title & Caption for single file or URL */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Title (Optional)
                                </label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Award Distribution, Welcome Speech"
                                    className="text-xs font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Caption / Description (Optional)
                                </label>
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Short caption or context for this photo/video..."
                                    rows={2}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-medium resize-none"
                                />
                            </div>

                            {uploadProgress && (
                                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 text-xs font-medium flex items-center gap-2">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>{uploadProgress}</span>
                                </div>
                            )}

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={uploading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={uploading}
                                    className="bg-primary text-white font-bold"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Adding Media...
                                        </>
                                    ) : (
                                        "Add to Gallery"
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
