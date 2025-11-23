"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMember, updateMember } from "@/app/admin/association/actions";
import { useActionState, useState } from "react";
import { createClient } from "@/lib/utils/client";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

type Member = {
    id?: string;
    name: string;
    role: string;
    commission?: string | null;
    bio?: string | null;
    photoUrl?: string | null;
    order: number;
};

export function MemberForm({ member }: { member?: Member }) {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(
        member ? updateMember : createMember,
        { error: "" }
    );
    const [uploading, setUploading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(member?.photoUrl || "");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const supabase = createClient();
        const { error: uploadError } = await supabase.storage
            .from("members")
            .upload(filePath, file);

        if (uploadError) {
            console.error(uploadError);
            alert("Erreur lors de l'upload");
        } else {
            const { data } = supabase.storage.from("members").getPublicUrl(filePath);
            setPhotoUrl(data.publicUrl);
        }
        setUploading(false);
    };

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            {member && <input type="hidden" name="id" value={member.id} />}
            <input type="hidden" name="photoUrl" value={photoUrl} />

            <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={member?.name}
                    required
                    placeholder="Ex: Amadou Ba"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Input
                        id="role"
                        name="role"
                        defaultValue={member?.role}
                        required
                        placeholder="Ex: Secrétaire Général"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="commission">Commission (Optionnel)</Label>
                    <Input
                        id="commission"
                        name="commission"
                        defaultValue={member?.commission || ""}
                        placeholder="Ex: Sociale"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Biographie (Optionnel)</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={member?.bio || ""}
                    placeholder="Une courte description..."
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label>Photo</Label>
                <div className="flex items-center gap-4">
                    {photoUrl && (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border">
                            <Image
                                src={photoUrl}
                                alt="Aperçu"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        {uploading && <p className="text-xs text-muted-foreground mt-1">Upload en cours...</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="order">Ordre d'affichage</Label>
                <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue={member?.order || 0}
                    required
                />
                <p className="text-xs text-muted-foreground">
                    Plus le chiffre est petit, plus le membre apparaît en premier.
                </p>
            </div>

            {state?.error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                    {state.error}
                </div>
            )}

            <Button type="submit" disabled={isPending || uploading}>
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {member ? "Mettre à jour" : "Créer le membre"}
            </Button>
        </form>
    );
}
