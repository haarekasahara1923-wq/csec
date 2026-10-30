export function extractYouTubeInfo(url: string): { isYouTube: boolean; videoId: string | null; embedUrl: string | null; thumbnailUrl: string | null } {
    if (!url) {
        return { isYouTube: false, videoId: null, embedUrl: null, thumbnailUrl: null };
    }

    const trimmed = url.trim();
    // Patterns for YouTube
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = trimmed.match(ytRegex);

    if (match && match[1]) {
        const videoId = match[1];
        return {
            isYouTube: true,
            videoId,
            embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        };
    }

    return { isYouTube: false, videoId: null, embedUrl: null, thumbnailUrl: null };
}

export function detectMediaType(url: string, declaredType?: string): "IMAGE" | "VIDEO" {
    if (declaredType === "VIDEO" || declaredType === "IMAGE") {
        return declaredType;
    }

    const { isYouTube } = extractYouTubeInfo(url);
    if (isYouTube) {
        return "VIDEO";
    }

    const lower = (url || "").toLowerCase();
    if (
        lower.endsWith(".mp4") ||
        lower.endsWith(".webm") ||
        lower.endsWith(".mov") ||
        lower.endsWith(".mkv") ||
        lower.endsWith(".avi") ||
        lower.includes("/video/")
    ) {
        return "VIDEO";
    }

    return "IMAGE";
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}

