"use client";

import { useState } from "react";
import { createAdminUser } from "../actions/setup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SetupPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSetup = async () => {
        setLoading(true);
        const res = await createAdminUser();
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Configuration Initiale</CardTitle>
                    <CardDescription>
                        Créer le compte administrateur par défaut
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleSetup}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Création..." : "Créer l'administrateur"}
                    </Button>

                    {result && (
                        <div className={`p-4 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {result.success ? (
                                <div>
                                    <p className="font-bold">✅ Utilisateur créé avec succès!</p>
                                    <p className="text-sm mt-2">Email: {result.email}</p>
                                    <p className="text-sm">Password: AdminBaytul2024!</p>
                                    <a href="/admin/login" className="text-blue-600 underline block mt-4">
                                        Aller à la page de connexion →
                                    </a>
                                </div>
                            ) : (
                                <p>❌ Erreur: {result.error}</p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
