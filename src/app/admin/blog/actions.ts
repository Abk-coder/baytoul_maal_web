"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { MediaType } from "@prisma/client";

type MediaType = "VIDEO" | "ARTICLE" | "AUDIO";

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function createPost(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as MediaType;
    const mediaUrl = formData.get("mediaUrl") as string;
    const coverImage = formData.get("coverImage") as string | null;
    const publishedAtStr = formData.get("publishedAt") as string;
    const tags = formData.get("tags") as string;

    if (!title || !content) {
        return { error: "Le titre et le contenu sont obligatoires." };
    }

    let slug = slugify(title);

    // Ensure slug uniqueness
    let count = 0;
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
        count++;
        slug = `${slugify(title)}-${count}`;
    }

    try {
        await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                type: type || "ARTICLE",
                mediaUrl: mediaUrl || null,
                coverImage: coverImage || null,
                publishedAt: publishedAtStr ? new Date(publishedAtStr) : null,
                tags: tags || "",
            },
        });
    } catch (error) {
        console.error(error);
        return { error: "Erreur lors de la création de l'article." };
    }

    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

export async function updatePost(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as MediaType;
    const mediaUrl = formData.get("mediaUrl") as string;
    const coverImage = formData.get("coverImage") as string | null;
    const publishedAtStr = formData.get("publishedAt") as string;
    const tags = formData.get("tags") as string;

    if (!id || !title || !content) {
        return { error: "Données manquantes." };
    }

    const dataToUpdate: any = {
        title,
        content,
        type: type || "ARTICLE",
        mediaUrl: mediaUrl || null,
        publishedAtStr: publishedAtStr ? new Date(publishedAtStr) : null,
        tags: tags || "",
    };

    // Only update coverImage if provided
    if (coverImage) {
        dataToUpdate.coverImage = coverImage;
    }

    try {
        await prisma.blogPost.update({
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        console.error(error);
        return { error: "Erreur lors de la mise à jour de l'article." };
    }

    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

