"use client";

import { useState } from "react";
import { Lesson } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, GripVertical, Video } from "lucide-react";
import { createLesson, deleteLesson } from "@/app/admin/education/[id]/actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface LessonListProps {
    courseId: string;
    lessons: Lesson[];
}

export function LessonList({ courseId, lessons }: LessonListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateLesson(formData: FormData) {
        setIsLoading(true);
        try {
            // Auto-calculate position
            const position = lessons.length + 1;
            formData.append("position", position.toString());

            await createLesson(courseId, formData);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error creating lesson:", error);
            alert("Erreur lors de la création de la leçon");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(lessonId: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette leçon ?")) return;
        try {
            await deleteLesson(lessonId, courseId);
        } catch (error) {
            console.error("Error deleting lesson:", error);
            alert("Erreur lors de la suppression");
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leçons ({lessons.length})</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une leçon
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nouvelle Leçon</DialogTitle>
                        </DialogHeader>
                        <form action={handleCreateLesson} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input id="title" name="title" required placeholder="Ex: Introduction" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="videoUrl">URL Vidéo (YouTube/Embed)</Label>
                                <Input id="videoUrl" name="videoUrl" placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Contenu (Optionnel)</Label>
                                <Textarea id="content" name="content" placeholder="Description ou contenu textuel..." />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Création..." : "Ajouter"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md border group hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                                    {lesson.position}
                                </div>
                                <div>
                                    <p className="font-medium">{lesson.title}</p>
                                    {lesson.videoUrl && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Video className="h-3 w-3 mr-1" />
                                            Vidéo incluse
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDelete(lesson.id)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {lessons.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                            Aucune leçon pour le moment.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
