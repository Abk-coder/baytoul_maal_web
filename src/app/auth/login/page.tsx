"use client";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useActionState } from "react";

const initialState = {
    error: "",
};

export default function LoginPage() {
    // @ts-ignore - useActionState types might be tricky with server actions in some versions
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="bg-primary text-primary-foreground w-16 h-16 rounded-lg flex items-center justify-center font-serif font-bold text-3xl mx-auto mb-4">
                        B
                    </div>
                    <CardTitle className="text-2xl font-serif">Administration</CardTitle>
                    <CardDescription>
                        Connectez-vous pour accéder au dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@baytulmaal.sn"
                                required
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isPending}
                            />
                        </div>

                        {state?.error && (
                            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                <AlertCircle className="h-4 w-4" />
                                {state.error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Connexion..." : "Se connecter"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>Compte par défaut :</p>
                        <p className="font-mono text-xs mt-1">
                            admin@baytulmaal.sn / AdminBaytul2024!
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
