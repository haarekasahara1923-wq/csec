"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { slugify, extractYouTubeInfo, detectMediaType } from "@/lib/gallery-utils";

async function requireAdmin() {
    try {
        const session = await auth();
        if (session?.user) {
            return session;
        }
    } catch (e) {
        console.warn("Auth check in server action error (handled):", e);
    }
    return null;
}

export async function createAlbum(data: {
    title: string;
    description?: string;
    coverImage?: string;
    active?: boolean;
}) {
    try {
        await requireAdmin();

        if (!data.title || !data.title.trim()) {
            return { error: "Album title is required" };
        }

        const baseSlug = slugify(data.title.trim()) || "album";
        let uniqueSlug = baseSlug;
        let counter = 1;

        // Ensure unique slug
        while (await prisma.galleryAlbum.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        const album = await prisma.galleryAlbum.create({
            data: {
                title: data.title.trim(),
                slug: uniqueSlug,
                description: data.description?.trim() || null,
                coverImage: data.coverImage?.trim() || null,
                active: data.active ?? true,
            },
        });

        revalidatePath("/admin/gallery");
        revalidatePath("/gallery");
        return { success: true, album };
    } catch (error: any) {
        console.error("Create album error:", error);
        return { error: error?.message || "Failed to create album" };
    }
}

export async function updateAlbum(
    id: string,
    data: {
        title?: string;
        description?: string;
        coverImage?: string;
        active?: boolean;
    }
) {
    try {
        await requireAdmin();

        const updateData: any = {};
        if (data.title !== undefined) updateData.title = data.title.trim();
        if (data.description !== undefined) updateData.description = data.description.trim() || null;
        if (data.coverImage !== undefined) updateData.coverImage = data.coverImage.trim() || null;
        if (data.active !== undefined) updateData.active = data.active;

        const album = await prisma.galleryAlbum.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/gallery");
        revalidatePath(`/admin/gallery/${id}`);
        revalidatePath("/gallery");
        revalidatePath(`/gallery/${album.slug}`);
        return { success: true, album };
    } catch (error: any) {
        console.error("Update album error:", error);
        return { error: error?.message || "Failed to update album" };
    }
}

export async function deleteAlbum(id: string) {
    try {
        await requireAdmin();

        await prisma.galleryAlbum.delete({
            where: { id },
        });

        revalidatePath("/admin/gallery");
        revalidatePath("/gallery");
        return { success: true };
    } catch (error: any) {
        console.error("Delete album error:", error);
        return { error: error?.message || "Failed to delete album" };
    }
}

export async function addGalleryItem(data: {
    albumId: string;
    title?: string;
    type?: "IMAGE" | "VIDEO";
    url: string;
    thumbnailUrl?: string;
    caption?: string;
}) {
    try {
        await requireAdmin();

        if (!data.albumId) {
            return { error: "Album ID is required" };
        }
        if (!data.url || !data.url.trim()) {
            return { error: "Media URL is required" };
        }

        const trimmedUrl = data.url.trim();
        let determinedType = data.type || detectMediaType(trimmedUrl);
        let finalThumbnail = data.thumbnailUrl?.trim() || null;

        // Auto-extract thumbnail for YouTube videos if not set
        const ytInfo = extractYouTubeInfo(trimmedUrl);
        if (ytInfo.isYouTube) {
            determinedType = "VIDEO";
            if (!finalThumbnail && ytInfo.thumbnailUrl) {
                finalThumbnail = ytInfo.thumbnailUrl;
            }
        }

        const item = await prisma.galleryItem.create({
            data: {
                albumId: data.albumId,
                title: data.title?.trim() || null,
                type: determinedType,
                url: trimmedUrl,
                thumbnailUrl: finalThumbnail,
                caption: data.caption?.trim() || null,
            },
        });

        // If the album has no cover image yet and this is an image or has thumbnail, set it as cover
        const album = await prisma.galleryAlbum.findUnique({
            where: { id: data.albumId },
            select: { coverImage: true, slug: true },
        });

        if (album && !album.coverImage) {
            const cover = finalThumbnail || (determinedType === "IMAGE" ? trimmedUrl : null);
            if (cover) {
                await prisma.galleryAlbum.update({
                    where: { id: data.albumId },
                    data: { coverImage: cover },
                });
            }
        }

        revalidatePath("/admin/gallery");
        revalidatePath(`/admin/gallery/${data.albumId}`);
        revalidatePath("/gallery");
        if (album?.slug) {
            revalidatePath(`/gallery/${album.slug}`);
        }

        return { success: true, item };
    } catch (error: any) {
        console.error("Add gallery item error:", error);
        return { error: error?.message || "Failed to add gallery item" };
    }
}

export async function deleteGalleryItem(id: string) {
    try {
        await requireAdmin();

        const item = await prisma.galleryItem.findUnique({
            where: { id },
            select: { albumId: true },
        });

        if (!item) {
            return { error: "Item not found" };
        }

        await prisma.galleryItem.delete({
            where: { id },
        });

        revalidatePath("/admin/gallery");
        revalidatePath(`/admin/gallery/${item.albumId}`);
        revalidatePath("/gallery");

        return { success: true };
    } catch (error: any) {
        console.error("Delete gallery item error:", error);
        return { error: error?.message || "Failed to delete item" };
    }
}

export async function setAlbumCover(albumId: string, imageUrl: string) {
    try {
        await requireAdmin();

        await prisma.galleryAlbum.update({
            where: { id: albumId },
            data: { coverImage: imageUrl },
        });

        revalidatePath("/admin/gallery");
        revalidatePath(`/admin/gallery/${albumId}`);
        revalidatePath("/gallery");

        return { success: true };
    } catch (error: any) {
        console.error("Set cover error:", error);
        return { error: error?.message || "Failed to set cover image" };
    }
}

export async function clearAllMockAlbums() {
    try {
        await requireAdmin();

        await prisma.galleryItem.deleteMany({});
        await prisma.galleryAlbum.deleteMany({});

        revalidatePath("/admin/gallery");
        revalidatePath("/gallery");

        return { success: true };
    } catch (error: any) {
        console.error("Clear albums error:", error);
        return { error: error?.message || "Failed to clear albums" };
    }
}
