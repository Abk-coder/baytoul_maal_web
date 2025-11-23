"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";
import { registerToEvent } from "@/app/evenements/actions";

interface RegistrationModalProps {
    eventId: string;
    eventTitle: string;
    isFull: boolean;
}

export function RegistrationModal({ eventId, eventTitle, isFull }: RegistrationModalProps) {
    const [open, setOpen] = useState(false);
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(registerToEvent, { error: "" });

    // Fermer le modal après succès
    if (state?.success && open) {
        setTimeout(() => {
            setOpen(false);
            window.location.reload(); // Recharger pour voir le compteur mis à jour
        }, 2000);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" size="lg" disabled={isFull}>
                    {isFull ? "Événement complet" : "S'inscrire à l'événement"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Inscription à l'événement</DialogTitle>
                    <DialogDescription>
                        {eventTitle}
                    </DialogDescription>
                </DialogHeader>

                {state?.success ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                        <p className="text-center text-lg font-medium text-green-700">
                            {state.message}
                        </p>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="eventId" value={eventId} />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom *</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    required
                                    placeholder="Amadou"
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom *</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    required
                                    placeholder="Diallo"
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="+221 77 123 45 67"
                                disabled={isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Adresse</Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Votre adresse (optionnel)"
                                rows={3}
                                disabled={isPending}
                            />
                        </div>

                        {state?.error && (
                            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                                {state.error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="flex-1"
                                disabled={isPending}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isPending}>
                                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Confirmer l'inscription
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
