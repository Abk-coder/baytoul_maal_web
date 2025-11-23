"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

export async function createEvent(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const videoUrl = formData.get("videoUrl") as string | null;
    const category = formData.get("category") as string;
    const capacity = formData.get("capacity") as string;
    const organizers = formData.get("organizers") as string;

    if (!title || !description || !startDate || !location) {
        return { error: "Le titre, la description, la date et le lieu sont obligatoires." };
    }

    try {
        const event = await prisma.event.create({
            data: {
                title,
                slug: slugify(title),
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                time: time || null,
                location,
                address: address || null,
                imageUrl: imageUrl || null,
                videoUrl: videoUrl || null,
                galleryUrls: formData.getAll("galleryUrls") as string[],
                category: category || null,
                capacity: capacity ? parseInt(capacity) : null,
                organizers: organizers || null,
                isPublished: true,
                registered: 0,
            },
        });

        revalidatePath("/admin/evenements");
        revalidatePath("/evenements");
        redirect("/admin/evenements");
    } catch (error) {
        console.error("Error creating event:", error);
        return { error: "Erreur lors de la création de l'événement." };
    }
}

export async function updateEvent(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const category = formData.get("category") as string;
    const capacity = formData.get("capacity") as string;
    const organizers = formData.get("organizers") as string;
    const isPublished = formData.get("isPublished") === "true";
    const imageUrl = formData.get("imageUrl") as string | null;
    const videoUrl = formData.get("videoUrl") as string | null;
    const galleryUrls = formData.getAll("galleryUrls") as string[];

    if (!id || !title || !description || !startDate || !location) {
        return { error: "Données manquantes." };
    }

    const dataToUpdate: any = {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        time: time || null,
        location,
        address: address || null,
        category: category || null,
        capacity: capacity ? parseInt(capacity) : null,
        organizers: organizers || null,
        isPublished,
        galleryUrls,
    };

    // Only update media URLs if new ones are provided
    if (imageUrl) {
        dataToUpdate.imageUrl = imageUrl;
    }
    if (videoUrl) {
        dataToUpdate.videoUrl = videoUrl;
    }

    try {
        await prisma.event.update({
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        console.error(error);
        return { error: "Erreur lors de la mise à jour de l'événement." };
    }

    revalidatePath("/admin/evenements");
    redirect("/admin/evenements");
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({ where: { id } });
        revalidatePath("/admin/evenements");
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la suppression de l'événement.");
    }
}

export async function toggleEventPublish(id: string, isPublished: boolean) {
    try {
        await prisma.event.update({
            where: { id },
            data: { isPublished },
        });
        revalidatePath("/admin/evenements");
        revalidatePath("/");
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la modification du statut de publication.");
    }
}
