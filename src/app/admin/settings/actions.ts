"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
    const siteName = formData.get("siteName") as string;
    const siteUrl = formData.get("siteUrl") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const facebookUrl = formData.get("facebookUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const whatsappUrl = formData.get("whatsappUrl") as string;
    const telegramUrl = formData.get("telegramUrl") as string;
    const tiktokUrl = formData.get("tiktokUrl") as string;
    const bankName = formData.get("bankName") as string;
    const accountNumber = formData.get("accountNumber") as string;
    const mobilePayment = formData.get("mobilePayment") as string;

    await prisma.settings.upsert({
        where: { id: "default-settings" },
        update: {
            siteName,
            siteUrl,
            description: description || null,
            email: email || null,
            phone: phone || null,
            address: address || null,
            facebookUrl: facebookUrl || null,
            instagramUrl: instagramUrl || null,
            youtubeUrl: youtubeUrl || null,
            whatsappUrl: whatsappUrl || null,
            telegramUrl: telegramUrl || null,
            tiktokUrl: tiktokUrl || null,
            bankName: bankName || null,
            accountNumber: accountNumber || null,
            mobilePayment: mobilePayment || null,
        },
        create: {
            id: "default-settings",
            siteName,
            siteUrl,
            description: description || null,
            email: email || null,
            phone: phone || null,
            address: address || null,
            facebookUrl: facebookUrl || null,
            instagramUrl: instagramUrl || null,
            youtubeUrl: youtubeUrl || null,
            whatsappUrl: whatsappUrl || null,
            telegramUrl: telegramUrl || null,
            tiktokUrl: tiktokUrl || null,
            bankName: bankName || null,
            accountNumber: accountNumber || null,
            mobilePayment: mobilePayment || null,
        },
    });

    revalidatePath("/admin/settings");
}
