"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPost, updatePost } from "@/app/admin/blog/actions";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/utils/client";

type BlogPost = {
    id?: string;
    title: string;
    content: string;
    type: "ARTICLE" | "VIDEO" | "AUDIO";
    mediaUrl?: string | null;
    coverImage?: string | null;
    publishedAt?: Date | null;
    tags: string;
};

export function PostEditor({ post }: { post?: BlogPost }) {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(
        post ? updatePost : createPost,
        { error: "" }
    );

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedCoverImage, setUploadedCoverImage] = useState<string | null>(post?.coverImage || null);

    const compressImage = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Canvas context not available"));
                    return;
                }

                const MAX_WIDTH = 1920;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: "image/jpeg",
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error("Compression failed"));
                        }
                    },
                    "image/jpeg",
                    0.8
                );
            };
            img.onerror = (error) => reject(error);
        });
    };

    const uploadToSupabase = async (file: File): Promise<string> => {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { data, error } = await supabase.storage
            .from('events')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            throw new Error(`Erreur upload: ${error.message}`);
        }

        const { data: urlData } = supabase.storage
            .from('events')
            .getPublicUrl(filePath);

        return urlData.publicUrl;
    };

    const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadProgress(0);

            // Compress if needed
            let fileToUpload = file;
            if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
                setUploadProgress(25);
                fileToUpload = await compressImage(file);
            }

            // Upload to Supabase
            setUploadProgress(50);
            const url = await uploadToSupabase(fileToUpload);

            setUploadedCoverImage(url);
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 2000);
        } catch (error) {
            console.error("Cover image upload failed:", error);
            alert("Erreur lors de l'upload de l'image. Veuillez réessayer.");
            setUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            {post && <input type="hidden" name="id" value={post.id} />}
            {uploadedCoverImage && <input type="hidden" name="coverImage" value={uploadedCoverImage} />}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={post?.title}
                            required
                            placeholder="Titre de l'article"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Contenu</Label>
                        <Textarea
                            id="content"
                            name="content"
                            defaultValue={post?.content}
                            required
                            placeholder="Contenu de l'article (Markdown supporté)"
                            rows={15}
                            className="font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Image de couverture</Label>
                        <Input
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            disabled={isUploading}
                        />
                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        )}
                        {(uploadedCoverImage || post?.coverImage) && (
                            <div className="text-xs text-muted-foreground mt-1">
                                ✓ Image uploadée : <a href={uploadedCoverImage || post?.coverImage || ""} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir</a>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type de contenu</Label>
                        <Select name="type" defaultValue={post?.type || "ARTICLE"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ARTICLE">Article</SelectItem>
                                <SelectItem value="VIDEO">Vidéo</SelectItem>
                                <SelectItem value="AUDIO">Audio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mediaUrl">URL Média (Optionnel)</Label>
                        <Input
                            id="mediaUrl"
                            name="mediaUrl"
                            defaultValue={post?.mediaUrl || ""}
                            placeholder="https://youtube.com/..."
                        />
                        <p className="text-xs text-muted-foreground">
                            Pour les vidéos ou audios externes.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="publishedAt">Date de publication</Label>
                        <Input
                            id="publishedAt"
                            name="publishedAt"
                            type="date"
                            defaultValue={post?.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : ""}
                        />
                        <p className="text-xs text-muted-foreground">
                            Laisser vide pour garder en brouillon.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            name="tags"
                            defaultValue={post?.tags || ""}
                            placeholder="islam, zakat, ..."
                        />
                        <p className="text-xs text-muted-foreground">
                            Séparés par des virgules.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={isPending || isUploading}>
                            {(isPending || isUploading) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {post ? "Mettre à jour" : "Publier"}
                        </Button>
                    </div>

                    {state?.error && (
                        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                            {state.error}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
