import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const quiz = await prisma.quiz.findUnique({
        where: { id },
    });

    if (!quiz) {
        return {
            title: "Quiz non trouvé",
        };
    }

    return {
        title: quiz.title,
        description: (quiz.description || "").substring(0, 160),
        openGraph: {
            title: quiz.title,
            description: (quiz.description || "").substring(0, 160),
            type: "website",
        },
    };
}

export default async function QuizPage({ params }: PageProps) {
    const { id } = await params;

    const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: {
            questions: {
                orderBy: {
                    order: 'asc'
                },
                include: {
                    answers: true
                }
            }
        }
    });

    if (!quiz) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary pl-0">
                        <Link href="/quiz">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux quiz
                        </Link>
                    </Button>
                </div>

                <QuizPlayer quiz={quiz} />
            </div>
        </div>
    );
}
