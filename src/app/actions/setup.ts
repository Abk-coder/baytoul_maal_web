"use server";

import prisma from "@/lib/prisma";

export async function createAdminUser() {
    try {
        // Note: With Supabase Auth, users are created in Supabase Dashboard
        // This function just ensures the user exists in Prisma DB
        const admin = await prisma.user.upsert({
            where: { email: "admin@baytulmaal.sn" },
            update: {},
            create: {
                id: "admin-placeholder-id", // Should be replaced with actual Supabase UUID
                email: "admin@baytulmaal.sn",
                role: "ADMIN"
            }
        });

        return { success: true, email: admin.email };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
