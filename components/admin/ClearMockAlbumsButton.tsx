"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { clearAllMockAlbums } from "@/app/actions/gallery";

export default function ClearMockAlbumsButton({ albumCount }: { albumCount: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    if (albumCount === 0) return null;

    const handleClear = async () => {
        setIsDeleting(true);
        setError("");
        try {
            const res = await clearAllMockAlbums();
            if (res.success) {
                setIsOpen(false);
                router.refresh();
            } else {
                setError(res.error || "Failed to remove mock albums");
            }
        } catch (err: any) {
            setError(err?.message || "Failed to remove mock albums");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="text-xs font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Remove Mock Albums
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Remove All Mock Albums?</h4>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                            This will permanently delete all {albumCount} existing mock/test albums and their items from both the admin and public gallery so you can start with a clean slate.
                        </p>

                        {error && (
                            <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-xl font-medium border border-red-100 text-left">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-center space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleClear}
                                disabled={isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                                        Removing...
                                    </>
                                ) : (
                                    "Yes, Remove All"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
