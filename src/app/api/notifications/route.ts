import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Récupérer les derniers contenus créés dans les 3 derniers mois
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Récupérer les événements récents
        const events = await prisma.event.findMany({
            where: {
                createdAt: { gte: threeMonthsAgo },
                isPublished: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                slug: true,
                startDate: true,
                createdAt: true,
            },
        });

        // Récupérer les articles récents
        const posts = await prisma.blogPost.findMany({
            where: {
                createdAt: { gte: threeMonthsAgo },
                publishedAt: { not: null },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
            },
        });

        // Récupérer les cours récents
        const courses = await prisma.course.findMany({
            where: {
                createdAt: { gte: threeMonthsAgo },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                createdAt: true,
            },
        });

        // Récupérer les quiz récents
        const quizzes = await prisma.quiz.findMany({
            where: {
                createdAt: { gte: threeMonthsAgo },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                createdAt: true,
            },
        });

        // Formater les notifications
        const notifications = [
            ...events.map((event) => ({
                id: `event-${event.id}`,
                type: "event" as const,
                title: "Nouvel événement",
                message: event.title,
                link: `/evenements/${event.slug}`,
                createdAt: event.createdAt,
                read: false,
            })),
            ...posts.map((post) => ({
                id: `blog-${post.id}`,
                type: "blog" as const,
                title: "Nouvel article",
                message: post.title,
                link: `/blog/${post.slug}`,
                createdAt: post.createdAt,
                read: false,
            })),
            ...courses.map((course) => ({
                id: `course-${course.id}`,
                type: "course" as const,
                title: "Nouveau cours",
                message: course.title,
                link: `/education/${course.id}`,
                createdAt: course.createdAt,
                read: false,
            })),
            ...quizzes.map((quiz) => ({
                id: `quiz-${quiz.id}`,
                type: "quiz" as const,
                title: "Nouveau quiz",
                message: quiz.title,
                link: `/quiz/${quiz.id}`,
                createdAt: quiz.createdAt,
                read: false,
            })),
        ];

        // Trier par date de création (plus récent en premier)
        notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        // Limiter à 20 notifications
        const limitedNotifications = notifications.slice(0, 20);

        return NextResponse.json(limitedNotifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}
