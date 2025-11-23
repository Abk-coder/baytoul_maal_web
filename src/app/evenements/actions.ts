"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function registerToEvent(prevState: any, formData: FormData) {
    const eventId = formData.get("eventId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // Validation
    if (!eventId || !firstName || !lastName || !phone) {
        return { error: "Tous les champs obligatoires doivent être remplis." };
    }

    if (firstName.length < 2 || lastName.length < 2) {
        return { error: "Le nom et le prénom doivent contenir au moins 2 caractères." };
    }

    try {
        // Vérifier que l'événement existe et n'est pas complet
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return { error: "Événement introuvable." };
        }

        if (event.capacity && event.registered >= event.capacity) {
            return { error: "Désolé, cet événement est complet." };
        }

        // Créer l'inscription et incrémenter le compteur en une transaction
        await prisma.$transaction([
            prisma.eventRegistration.create({
                data: {
                    eventId,
                    firstName,
                    lastName,
                    phone,
                    address: address || null,
                },
            }),
            prisma.event.update({
                where: { id: eventId },
                data: {
                    registered: {
                        increment: 1,
                    },
                },
            }),
        ]);

        revalidatePath(`/evenements/${event.slug}`);
        revalidatePath("/");

        return { success: true, message: "Inscription réussie ! Nous avons bien enregistré votre participation." };
    } catch (error) {
        console.error("Error registering to event:", error);
        return { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." };
    }
}
