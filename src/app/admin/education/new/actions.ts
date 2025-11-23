"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CourseLevel } from "@prisma/client";

export async function createCourse(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as CourseLevel;
    const instructor = formData.get("instructor") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;

    await prisma.course.create({
        data: {
            title,
            description,
            level,
            instructor,
            thumbnailUrl,
        },
    });

    revalidatePath("/admin/education");
    revalidatePath("/education");
}
