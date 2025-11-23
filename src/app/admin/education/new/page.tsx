"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createCourse } from "../actions";
import { Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/utils/client";

export default function NewCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
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
                .from('public') // Assuming 'public' bucket or similar
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
            await createCourse(formData);
            router.push("/admin/education");
        } catch (error) {
            console.error("Error creating course:", error);
            alert("Erreur lors de la création du cours");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Nouveau Cours</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre du cours</Label>
                            <Input id="title" name="title" required placeholder="Ex: Introduction au Tajwid" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Description détaillée du cours..."
                                className="h-32"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="level">Niveau</Label>
                                <Select name="level" defaultValue="BEGINNER">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un niveau" />
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
                                <Input id="instructor" name="instructor" placeholder="Ex: Oustaz Alioune" />
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

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isLoading}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" disabled={isLoading || isUploading} className="bg-emerald-600 hover:bg-emerald-700">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Créer le cours
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
