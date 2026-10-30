import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AlbumDetailClient from "./AlbumDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminAlbumDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const album = await prisma.galleryAlbum.findUnique({
        where: { id: params.id },
        include: {
            items: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!album) {
        notFound();
    }

    return <AlbumDetailClient album={album} />;
}
