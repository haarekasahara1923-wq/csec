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
    Youtube,
    FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { addGalleryItem } from "@/app/actions/gallery";
import { extractYouTubeInfo } from "@/lib/gallery-utils";

interface AddMediaModalProps {
    albumId: string;
    albumTitle: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

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
    const [progressPercent, setProgressPercent] = useState<number>(0);
    const [error, setError] = useState("");
    const [successCount, setSuccessCount] = useState<number | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);

            // Validate 100 MB limit on selected files
            for (const file of filesArray) {
                if (file.size > MAX_FILE_SIZE) {
                    const mbSize = (file.size / (1024 * 1024)).toFixed(1);
                    setError(
                        `File "${file.name}" is ${mbSize} MB, which exceeds the 100 MB maximum limit. Please choose a file under 100 MB.`
                    );
                    e.target.value = "";
                    setSelectedFiles([]);
                    return;
                }
            }

            setSelectedFiles(filesArray);

            // Auto-detect type based on first file
            const first = filesArray[0];
            if (
                first.type.startsWith("video/") ||
                /\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(first.name)
            ) {
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
        } else if (/\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(val)) {
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
        setProgressPercent(0);
    };

    // Helper for uploading with XMLHttpRequest to track upload progress
    const uploadSingleFile = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append("file", file);

            xhr.open("POST", "/api/gallery/upload", true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 90);
                    setProgressPercent(percent);
                    const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
                    const totalMB = (event.total / (1024 * 1024)).toFixed(1);
                    setUploadProgress(
                        `Uploading: ${loadedMB} MB / ${totalMB} MB (${percent}%)`
                    );
                }
            };

            xhr.onload = () => {
                setProgressPercent(95);
                setUploadProgress("Processing media & configuring...");
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (xhr.status >= 200 && xhr.status < 300 && data.success) {
                        resolve(data);
                    } else {
                        reject(new Error(data.error || `Upload failed with status ${xhr.status}`));
                    }
                } catch (e) {
                    reject(new Error(`Server error: ${xhr.statusText || "Invalid response"}`));
                }
            };

            xhr.onerror = () => {
                reject(new Error("Network error during file upload. Check your connection."));
            };

            xhr.ontimeout = () => {
                reject(new Error("Upload timed out. If the video is large, please try again."));
            };

            // 5 minutes timeout for 100MB files
            xhr.timeout = 300000;
            xhr.send(formData);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setUploading(true);
        setProgressPercent(0);

        try {
            if (mode === "url") {
                if (!url.trim()) {
                    setError("Please enter an image URL, video URL, or YouTube link.");
                    setUploading(false);
                    return;
                }

                setUploadProgress("Saving link to album...");
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
                    setSuccessCount(1);
                    setTimeout(() => {
                        resetForm();
                        setIsOpen(false);
                        router.refresh();
                    }, 800);
                }
            } else {
                // File upload mode
                if (selectedFiles.length === 0) {
                    setError("Please select at least one photo or video file.");
                    setUploading(false);
                    return;
                }

                let completed = 0;
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    setUploadProgress(
                        `Uploading file ${i + 1} of ${selectedFiles.length}: "${file.name}"...`
                    );

                    const uploadData = await uploadSingleFile(file);

                    // Create item in DB
                    setUploadProgress(`Adding to album...`);
                    const itemTitle =
                        selectedFiles.length === 1 && title.trim()
                            ? title.trim()
                            : file.name.replace(/\.[^/.]+$/, "");
                    const itemCaption =
                        selectedFiles.length === 1 && caption.trim()
                            ? caption.trim()
                            : undefined;

                    const itemRes = await addGalleryItem({
                        albumId,
                        title: itemTitle,
                        caption: itemCaption,
                        url: uploadData.url,
                        thumbnailUrl: uploadData.thumbnailUrl,
                        type: uploadData.mediaType || mediaType,
                    });

                    if (itemRes && itemRes.error) {
                        throw new Error(itemRes.error);
                    }

                    completed++;
                }

                setProgressPercent(100);
                setSuccessCount(completed);
                setUploadProgress("Added successfully!");

                setTimeout(() => {
                    resetForm();
                    setIsOpen(false);
                    router.refresh();
                }, 1000);
            }
        } catch (err: any) {
            console.error("Add media error:", err);
            setError(err?.message || "Failed to add media item(s). Please try again.");
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
                                <p className="text-xs text-slate-400">
                                    Upload images/videos (Cloudinary configured, up to 100 MB per file) or paste links
                                </p>
                            </div>
                            <button
                                onClick={() => !uploading && setIsOpen(false)}
                                disabled={uploading}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex p-2 bg-slate-100/80 m-6 mb-2 rounded-2xl gap-2">
                            <button
                                type="button"
                                disabled={uploading}
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
                                disabled={uploading}
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
                                <div className="p-3.5 bg-red-50 text-red-600 text-xs rounded-xl font-medium border border-red-100 flex items-start gap-2.5">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {successCount !== null && (
                                <div className="p-3.5 bg-green-50 text-green-700 text-xs rounded-xl font-bold border border-green-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                                    <span>Successfully added {successCount} item(s)! Updating gallery...</span>
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
                                        disabled={uploading}
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
                                        disabled={uploading}
                                        onClick={() => setMediaType("VIDEO")}
                                        className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                            mediaType === "VIDEO"
                                                ? "border-secondary bg-secondary/10 text-primary"
                                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                        }`}
                                    >
                                        <VideoIcon className="w-4 h-4 text-secondary" />
                                        Video (Up to 100 MB)
                                    </button>
                                </div>
                            </div>

                            {/* File Upload Box */}
                            {mode === "file" && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                                            Select Files (Photos or Videos) *
                                        </label>
                                        <span className="text-[11px] font-bold text-slate-400">
                                            Max 100 MB per file
                                        </span>
                                    </div>

                                    <label className="border-2 border-dashed border-slate-200 hover:border-primary/50 hover:bg-slate-50/50 transition-all rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer text-center group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary/10 text-primary flex items-center justify-center mb-3 transition-colors">
                                            <UploadCloud className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">
                                            Click to browse or drag & drop files
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1">
                                            JPG, PNG, WEBP, MP4, WEBM, MOV (Max size: 100 MB)
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
                                            <div className="max-h-28 overflow-y-auto space-y-1 text-xs text-slate-500">
                                                {selectedFiles.map((f, i) => (
                                                    <div key={i} className="flex justify-between items-center text-[11px] py-0.5">
                                                        <span className="truncate max-w-[75%] font-medium text-slate-700 flex items-center gap-1">
                                                            <FileCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                                            {f.name}
                                                        </span>
                                                        <span className="text-slate-500 font-bold">
                                                            {(f.size / (1024 * 1024)).toFixed(2)} MB
                                                        </span>
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
                                            disabled={uploading}
                                            className="text-xs font-medium"
                                        />
                                        <span className="text-[11px] text-slate-400 mt-1 block">
                                            Paste any image link, direct video link, or YouTube video/shorts URL.
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
                                                disabled={uploading}
                                                className="text-xs font-medium"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Title & Caption */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                    Title (Optional)
                                </label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Award Distribution, Welcome Speech"
                                    disabled={uploading}
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
                                    disabled={uploading}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-medium resize-none disabled:bg-slate-50"
                                />
                            </div>

                            {/* Progress bar when uploading */}
                            {uploading && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                                            {uploadProgress || "Uploading..."}
                                        </span>
                                        {progressPercent > 0 && <span>{progressPercent}%</span>}
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progressPercent || 15}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400">
                                        Please keep this window open while the file uploads to Cloudinary.
                                    </p>
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
                                            Uploading & Adding...
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
