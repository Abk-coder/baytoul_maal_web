import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { QuestionList } from "@/components/admin/quiz/question-list";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateQuiz } from "../actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditQuizPage({ params }: PageProps) {
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

    async function handleUpdate(formData: FormData) {
        "use server";
        await updateQuiz(id, formData);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/quiz">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-serif">Modifier le Quiz</h1>
                    <p className="text-muted-foreground">{quiz.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations du Quiz</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={handleUpdate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input id="title" name="title" required defaultValue={quiz.title} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={quiz.description || ""}
                                        className="h-32"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    Enregistrer
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <QuestionList quizId={quiz.id} questions={quiz.questions} />
                </div>
            </div>
        </div>
    );
}
