"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createQuiz(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const quiz = await prisma.quiz.create({
        data: {
            title,
            description,
        },
    });

    revalidatePath("/admin/quiz");
    return quiz.id;
}

export async function updateQuiz(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.quiz.update({
        where: { id },
        data: {
            title,
            description,
        },
    });

    revalidatePath("/admin/quiz");
    revalidatePath(`/admin/quiz/${id}`);
}

export async function createQuestion(quizId: string, formData: FormData) {
    const text = formData.get("text") as string;
    const explanation = formData.get("explanation") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.question.create({
        data: {
            text,
            explanation,
            order,
            quizId,
        },
    });

    revalidatePath(`/admin/quiz/${quizId}`);
}

export async function createAnswer(questionId: string, quizId: string, formData: FormData) {
    const text = formData.get("text") as string;
    const isCorrect = formData.get("isCorrect") === "true";

    await prisma.answer.create({
        data: {
            text,
            isCorrect,
            questionId,
        },
    });

    revalidatePath(`/admin/quiz/${quizId}`);
}

export async function deleteQuestion(questionId: string, quizId: string) {
    await prisma.question.delete({
        where: { id: questionId },
    });

    revalidatePath(`/admin/quiz/${quizId}`);
}

export async function deleteAnswer(answerId: string, quizId: string) {
    await prisma.answer.delete({
        where: { id: answerId },
    });

    revalidatePath(`/admin/quiz/${quizId}`);
}
