"use client";

import { useState } from "react";
import { Question, Answer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, CheckCircle, Circle } from "lucide-react";
import { createQuestion, createAnswer, deleteQuestion, deleteAnswer } from "@/app/admin/quiz/actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionListProps {
    quizId: string;
    questions: (Question & { answers: Answer[] })[];
}

export function QuestionList({ quizId, questions }: QuestionListProps) {
    const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
    const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateQuestion(formData: FormData) {
        setIsLoading(true);
        try {
            const order = questions.length + 1;
            formData.append("order", order.toString());

            await createQuestion(quizId, formData);
            setIsQuestionDialogOpen(false);
        } catch (error) {
            console.error("Error creating question:", error);
            alert("Erreur lors de la création de la question");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateAnswer(formData: FormData) {
        if (!selectedQuestionId) return;

        setIsLoading(true);
        try {
            await createAnswer(selectedQuestionId, quizId, formData);
            setIsAnswerDialogOpen(false);
            setSelectedQuestionId(null);
        } catch (error) {
            console.error("Error creating answer:", error);
            alert("Erreur lors de la création de la réponse");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteQuestion(questionId: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette question et toutes ses réponses ?")) return;
        try {
            await deleteQuestion(questionId, quizId);
        } catch (error) {
            console.error("Error deleting question:", error);
            alert("Erreur lors de la suppression");
        }
    }

    async function handleDeleteAnswer(answerId: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return;
        try {
            await deleteAnswer(answerId, quizId);
        } catch (error) {
            console.error("Error deleting answer:", error);
            alert("Erreur lors de la suppression");
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Questions ({questions.length})</CardTitle>
                    <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter une question
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Nouvelle Question</DialogTitle>
                            </DialogHeader>
                            <form action={handleCreateQuestion} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="text">Question</Label>
                                    <Textarea id="text" name="text" required placeholder="Quelle est votre question ?" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="explanation">Explication (Optionnel)</Label>
                                    <Textarea id="explanation" name="explanation" placeholder="Explication de la réponse..." />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Création..." : "Ajouter"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <Card key={question.id} className="border-l-4 border-l-emerald-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                                    Q{index + 1}
                                                </span>
                                            </div>
                                            <p className="font-medium">{question.text}</p>
                                            {question.explanation && (
                                                <p className="text-sm text-muted-foreground mt-2 italic">
                                                    💡 {question.explanation}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm font-semibold">Réponses ({question.answers.length})</Label>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedQuestionId(question.id);
                                                    setIsAnswerDialogOpen(true);
                                                }}
                                            >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Réponse
                                            </Button>
                                        </div>
                                        {question.answers.map((answer) => (
                                            <div
                                                key={answer.id}
                                                className={`flex items-center justify-between p-2 rounded border ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {answer.isCorrect ? (
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <Circle className="h-4 w-4 text-gray-400" />
                                                    )}
                                                    <span className="text-sm">{answer.text}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteAnswer(answer.id)}
                                                >
                                                    <Trash className="h-3 w-3 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                        {question.answers.length === 0 && (
                                            <p className="text-sm text-muted-foreground text-center py-2">
                                                Aucune réponse. Ajoutez-en au moins 2.
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {questions.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">
                                Aucune question pour le moment.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isAnswerDialogOpen} onOpenChange={setIsAnswerDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle Réponse</DialogTitle>
                    </DialogHeader>
                    <form action={handleCreateAnswer} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="answer-text">Texte de la réponse</Label>
                            <Input id="answer-text" name="text" required placeholder="Ex: 5" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isCorrect" name="isCorrect" value="true" />
                            <Label htmlFor="isCorrect" className="font-normal cursor-pointer">
                                Cette réponse est correcte
                            </Label>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Ajout..." : "Ajouter la réponse"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
