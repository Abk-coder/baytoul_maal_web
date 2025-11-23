import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreVertical, Pencil, Trash, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default async function AdminQuizPage() {
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Gestion des Quiz</h1>
                    <p className="text-muted-foreground">Créez et gérez les quiz islamiques.</p>
                </div>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/admin/quiz/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouveau Quiz
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-lg font-bold line-clamp-1">
                                    {quiz.title}
                                </CardTitle>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/quiz/${quiz.id}`}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Modifier
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {quiz.description || "Aucune description"}
                                </p>

                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                                        {quiz._count.questions} questions
                                    </Badge>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/quiz/${quiz.id}`}>
                                            Tester
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {quizzes.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                    <HelpCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground text-lg mb-4">Aucun quiz pour le moment</p>
                    <Button asChild>
                        <Link href="/admin/quiz/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Créer votre premier quiz
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
