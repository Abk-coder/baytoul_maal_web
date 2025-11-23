import prisma from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, HelpCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quiz Islamiques",
    description: "Testez vos connaissances sur l'Islam de manière ludique et éducative avec nos quiz interactifs.",
};

export default async function QuizListPage() {
    const quizzes = await prisma.quiz.findMany({
        include: {
            _count: {
                select: { questions: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Quiz Islamiques</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl">
                        Testez vos connaissances sur l'Islam de manière ludique et éducative.
                    </p>
                </div>
            </div>

            {/* Quiz Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} className="flex flex-col hover:shadow-lg transition-shadow border-none shadow-md">
                            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                        <BrainCircuit className="w-6 h-6" />
                                    </div>
                                    <Badge variant="outline" className="bg-white">
                                        {quiz._count.questions} questions
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold font-serif mt-4">
                                    {quiz.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex-1 pt-6">
                                <p className="text-muted-foreground line-clamp-3">
                                    {quiz.description}
                                </p>
                            </CardContent>

                            <CardFooter>
                                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    <Link href={`/quiz/${quiz.id}`}>
                                        <HelpCircle className="w-4 h-4 mr-2" />
                                        Commencer le Quiz
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {quizzes.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">Aucun quiz disponible pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
