"use client";

import { useState } from "react";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateCourse } from "@/app/admin/education/[id]/actions";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/utils/client";

interface CourseEditorProps {
    course: Course;
}

export function CourseEditor({ course }: CourseEditorProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState(course.thumbnailUrl || "");
    const [isUploading, setIsUploading] = useState(false);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `courses/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('public')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('public')
                .getPublicUrl(filePath);

            setThumbnailUrl(publicUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erreur lors de l'upload de l'image");
        } finally {
            setIsUploading(false);
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            if (thumbnailUrl) {
                formData.set("thumbnailUrl", thumbnailUrl);
            }
            await updateCourse(course.id, formData);
            alert("Cours mis à jour avec succès !");
        } catch (error) {
            console.error("Error updating course:", error);
            alert("Erreur lors de la mise à jour");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informations du Cours</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre du cours</Label>
                        <Input id="title" name="title" required defaultValue={course.title} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            defaultValue={course.description}
                            className="h-32"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="level">Niveau</Label>
                            <Select name="level" defaultValue={course.level}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BEGINNER">Débutant</SelectItem>
                                    <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
                                    <SelectItem value="ADVANCED">Avancé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructor">Instructeur</Label>
                            <Input id="instructor" name="instructor" defaultValue={course.instructor || ""} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Image de couverture</Label>
                        <div className="flex items-center gap-4">
                            {thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-md border"
                                />
                            )}
                            <div className="flex-1">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {isUploading && <p className="text-sm text-muted-foreground mt-1">Upload en cours...</p>}
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading || isUploading} className="bg-emerald-600 hover:bg-emerald-700">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Enregistrer les modifications
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
