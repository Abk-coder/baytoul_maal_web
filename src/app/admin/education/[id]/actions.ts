"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CourseLevel } from "@prisma/client";

export async function updateCourse(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as CourseLevel;
    const instructor = formData.get("instructor") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;

    await prisma.course.update({
        where: { id },
        data: {
            title,
            description,
            level,
            instructor,
            thumbnailUrl: thumbnailUrl || undefined,
        },
    });

    revalidatePath("/admin/education");
    revalidatePath(`/admin/education/${id}`);
    revalidatePath("/education");
}

export async function createLesson(courseId: string, formData: FormData) {
    const title = formData.get("title") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const content = formData.get("content") as string;
    const position = parseInt(formData.get("position") as string) || 0;

    await prisma.lesson.create({
        data: {
            title,
            videoUrl,
            content,
            position,
            courseId,
        },
    });

    revalidatePath(`/admin/education/${courseId}`);
}

export async function deleteLesson(lessonId: string, courseId: string) {
    await prisma.lesson.delete({
        where: { id: lessonId },
    });
    revalidatePath(`/admin/education/${courseId}`);
}
