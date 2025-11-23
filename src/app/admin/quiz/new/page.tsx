"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createQuiz } from "../actions";
import { Loader2 } from "lucide-react";

export default function NewQuizPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            const quizId = await createQuiz(formData);
            router.push(`/admin/quiz/${quizId}`);
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert("Erreur lors de la création du quiz");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Nouveau Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre du quiz</Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="Ex: Quiz sur les Piliers de l'Islam"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Description du quiz..."
                                className="h-32"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isLoading}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Créer et ajouter des questions
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
