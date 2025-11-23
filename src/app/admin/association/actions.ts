"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMember(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const commission = formData.get("commission") as string;
    const bio = formData.get("bio") as string;
    const photoUrl = formData.get("photoUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!name || !role) {
        return { error: "Le nom et le rôle sont obligatoires." };
    }

    try {
        await prisma.associationMember.create({
            data: {
                name,
                role,
                commission: commission || null,
                bio: bio || null,
                photoUrl: photoUrl || null,
                order,
            },
        });
    } catch (error) {
        return { error: "Erreur lors de la création du membre." };
    }

    revalidatePath("/admin/association");
    redirect("/admin/association");
}

export async function updateMember(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const commission = formData.get("commission") as string;
    const bio = formData.get("bio") as string;
    const photoUrl = formData.get("photoUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!id || !name || !role) {
        return { error: "Données manquantes." };
    }

    try {
        await prisma.associationMember.update({
            where: { id },
            data: {
                name,
                role,
                commission: commission || null,
                bio: bio || null,
                photoUrl: photoUrl || null,
                order,
            },
        });
    } catch (error) {
        return { error: "Erreur lors de la mise à jour du membre." };
    }

    revalidatePath("/admin/association");
    redirect("/admin/association");
}
