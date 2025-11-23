"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, updateEvent } from "@/app/admin/evenements/actions";
import { useActionState, useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/utils/client";

type Event = {
    id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date | null;
    time?: string | null;
    location: string;
    address?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    galleryUrls?: string[];
    category?: string | null;
    capacity?: number | null;
    organizers?: string | null;
    isPublished: boolean;
};

export function EventForm({ event }: { event?: Event }) {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(
        event ? updateEvent : createEvent,
        { error: "" }
    );

    const [organizers, setOrganizers] = useState<{ name: string; phone: string; email: string }[]>([]);
    const [uploadProgress, setUploadProgress] = useState({ image: 0, video: 0 });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(event?.imageUrl || null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(event?.videoUrl || null);

    const [galleryUrls, setGalleryUrls] = useState<string[]>(event?.galleryUrls || []);
    const [galleryUploadProgress, setGalleryUploadProgress] = useState<number>(0);

    useEffect(() => {
        if (event?.organizers) {
            try {
                const parsed = JSON.parse(event.organizers);
                if (Array.isArray(parsed)) {
                    setOrganizers(parsed);
                }
            } catch (e) {
                console.error("Failed to parse organizers JSON", e);
            }
        }
        if (event?.galleryUrls) {
            setGalleryUrls(event.galleryUrls);
        }
    }, [event]);

    const addOrganizer = () => {
        setOrganizers([...organizers, { name: "", phone: "", email: "" }]);
    };

    const removeOrganizer = (index: number) => {
        const newOrganizers = [...organizers];
        newOrganizers.splice(index, 1);
        setOrganizers(newOrganizers);
    };

    const updateOrganizer = (index: number, field: keyof (typeof organizers)[0], value: string) => {
        const newOrganizers = [...organizers];
        newOrganizers[index] = { ...newOrganizers[index], [field]: value };
        setOrganizers(newOrganizers);
    };

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

    const uploadToSupabase = async (file: File, type: 'image' | 'video'): Promise<string> => {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from('events')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error(`Upload error (${type}):`, error);
            throw new Error(`Erreur upload ${type}: ${error.message}`);
        }

        const { data: urlData } = supabase.storage
            .from('events')
            .getPublicUrl(filePath);

        return urlData.publicUrl;
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadProgress(prev => ({ ...prev, image: 0 }));

            // Compress if needed
            let fileToUpload = file;
            if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
                setUploadProgress(prev => ({ ...prev, image: 25 }));
                fileToUpload = await compressImage(file);
            }

            // Upload to Supabase
            setUploadProgress(prev => ({ ...prev, image: 50 }));
            const url = await uploadToSupabase(fileToUpload, 'image');

            setUploadedImageUrl(url);
            setUploadProgress(prev => ({ ...prev, image: 100 }));
            setTimeout(() => setUploadProgress(prev => ({ ...prev, image: 0 })), 2000);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Erreur lors de l'upload de l'image. Veuillez réessayer.");
            setUploadProgress(prev => ({ ...prev, image: 0 }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        try {
            setIsUploading(true);
            setGalleryUploadProgress(0);
            const totalFiles = files.length;
            let completedFiles = 0;
            const newUrls: string[] = [];

            for (let i = 0; i < totalFiles; i++) {
                const file = files[i];
                let fileToUpload = file;

                if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
                    fileToUpload = await compressImage(file);
                }

                const url = await uploadToSupabase(fileToUpload, 'image');
                newUrls.push(url);
                completedFiles++;
                setGalleryUploadProgress((completedFiles / totalFiles) * 100);
            }

            setGalleryUrls(prev => [...prev, ...newUrls]);
            setTimeout(() => setGalleryUploadProgress(0), 2000);
        } catch (error) {
            console.error("Gallery upload failed:", error);
            alert("Erreur lors de l'upload de la galerie. Veuillez réessayer.");
            setGalleryUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadProgress(prev => ({ ...prev, video: 0 }));

            setUploadProgress(prev => ({ ...prev, video: 30 }));
            const url = await uploadToSupabase(file, 'video');

            setUploadedVideoUrl(url);
            setUploadProgress(prev => ({ ...prev, video: 100 }));
            setTimeout(() => setUploadProgress(prev => ({ ...prev, video: 0 })), 2000);
        } catch (error) {
            console.error("Video upload failed:", error);
            alert("Erreur lors de l'upload de la vidéo. Veuillez réessayer.");
            setUploadProgress(prev => ({ ...prev, video: 0 }));
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            {event && <input type="hidden" name="id" value={event.id} />}

            {/* Hidden input to send JSON data */}
            <input type="hidden" name="organizers" value={JSON.stringify(organizers)} />
            {uploadedImageUrl && <input type="hidden" name="imageUrl" value={uploadedImageUrl} />}
            {uploadedVideoUrl && <input type="hidden" name="videoUrl" value={uploadedVideoUrl} />}
            {/* Hidden input for gallery URLs */}
            {galleryUrls.map((url, index) => (
                <input key={index} type="hidden" name="galleryUrls" value={url} />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne gauche */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={event?.title}
                            required
                            placeholder="Conférence : L'éducation en Islam"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={event?.description}
                            required
                            placeholder="Description détaillée de l'événement..."
                            rows={6}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Date de début *</Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                defaultValue={event?.startDate ? new Date(event.startDate).toISOString().split('T')[0] : ""}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">Date de fin</Label>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                defaultValue={event?.endDate ? new Date(event.endDate).toISOString().split('T')[0] : ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">Horaire</Label>
                        <Input
                            id="time"
                            name="time"
                            defaultValue={event?.time || ""}
                            placeholder="15:00 - 18:00"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Lieu *</Label>
                        <Input
                            id="location"
                            name="location"
                            defaultValue={event?.location}
                            required
                            placeholder="Mosquée Massalikoul Djinane"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse complète</Label>
                        <Input
                            id="address"
                            name="address"
                            defaultValue={event?.address || ""}
                            placeholder="Route de l'Aéroport, Yoff, Dakar, Sénégal"
                        />
                        <p className="text-xs text-muted-foreground">
                            Pour l'intégration Google Maps
                        </p>
                    </div>
                </div>

                {/* Colonne droite */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Input
                            id="category"
                            name="category"
                            defaultValue={event?.category || ""}
                            placeholder="Conférence, Formation, Social..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="capacity">Capacité</Label>
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            defaultValue={event?.capacity || ""}
                            placeholder="200"
                        />
                        <p className="text-xs text-muted-foreground">
                            Nombre maximum de participants
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageFile">Image/Affiche Principale</Label>
                        <Input
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isUploading}
                        />
                        {uploadProgress.image > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${uploadProgress.image}%` }}></div>
                            </div>
                        )}
                        {(uploadedImageUrl || event?.imageUrl) && (
                            <div className="text-xs text-muted-foreground mt-1">
                                ✓ Image uploadée : <a href={uploadedImageUrl || event?.imageUrl || ""} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir</a>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="galleryFiles">Galerie Photos (Plusieurs)</Label>
                        <Input
                            id="galleryFiles"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange}
                            disabled={isUploading}
                        />
                        {galleryUploadProgress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-emerald-600 h-2.5 rounded-full transition-all" style={{ width: `${galleryUploadProgress}%` }}></div>
                            </div>
                        )}

                        {galleryUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {galleryUrls.map((url, index) => (
                                    <div key={index} className="relative group aspect-square bg-muted rounded-md overflow-hidden border">
                                        <img src={url} alt={`Galerie ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="videoFile">Vidéo</Label>
                        <Input
                            id="videoFile"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            disabled={isUploading}
                        />
                        {uploadProgress.video > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${uploadProgress.video}%` }}></div>
                            </div>
                        )}
                        {(uploadedVideoUrl || event?.videoUrl) && (
                            <div className="text-xs text-muted-foreground mt-1">
                                ✓ Vidéo uploadée : <a href={uploadedVideoUrl || event?.videoUrl || ""} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir</a>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Organisateurs</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addOrganizer}>
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter
                            </Button>
                        </div>

                        {organizers.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
                                Aucun organisateur ajouté
                            </div>
                        )}

                        <div className="space-y-4">
                            {organizers.map((org, index) => (
                                <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/30 relative">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-destructive hover:text-destructive"
                                        onClick={() => removeOrganizer(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>

                                    <div className="space-y-2">
                                        <Label className="text-xs">Nom complet</Label>
                                        <Input
                                            value={org.name}
                                            onChange={(e) => updateOrganizer(index, "name", e.target.value)}
                                            placeholder="Ex: Cheikh Amadou"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Téléphone</Label>
                                            <Input
                                                value={org.phone}
                                                onChange={(e) => updateOrganizer(index, "phone", e.target.value)}
                                                placeholder="+221..."
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Email</Label>
                                            <Input
                                                value={org.email}
                                                onChange={(e) => updateOrganizer(index, "email", e.target.value)}
                                                placeholder="email@..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {event && (
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="isPublished"
                                name="isPublished"
                                defaultChecked={event.isPublished}
                                value="true"
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="isPublished" className="cursor-pointer">
                                Publier l'événement
                            </Label>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={isPending || isUploading}>
                            {(isPending || isUploading) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {event ? "Mettre à jour" : "Créer l'événement"}
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
