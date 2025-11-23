import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Settings, Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import prisma from "@/lib/prisma";
import { updateSettings } from "./actions";

export default async function AdminSettingsPage() {
    // Récupérer les paramètres existants ou créer des valeurs par défaut
    let settings = await prisma.settings.findUnique({
        where: { id: "default-settings" }
    });

    // Si aucun paramètre n'existe, utiliser des valeurs par défaut
    if (!settings) {
        settings = {
            id: "default-settings",
            siteName: "Baytul Maal",
            siteUrl: "https://baytulmaal.sn",
            description: "Association caritative musulmane dédiée à la solidarité et à l'entraide.",
            email: "contact@baytulmaal.sn",
            phone: "+221 XX XXX XX XX",
            address: "Dakar, Sénégal",
            facebookUrl: null,
            instagramUrl: null,
            youtubeUrl: null,
            whatsappUrl: null,
            telegramUrl: null,
            tiktokUrl: null,
            bankName: null,
            accountNumber: null,
            mobilePayment: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">Paramètres</h1>
                <p className="text-muted-foreground mt-1">Configurez les informations de votre association</p>
            </div>

            <form action={updateSettings} className="grid gap-6">
                {/* Informations générales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Informations Générales
                        </CardTitle>
                        <CardDescription>
                            Informations de base sur votre association
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Nom du site</Label>
                                <Input
                                    id="siteName"
                                    name="siteName"
                                    defaultValue={settings.siteName}
                                    placeholder="Nom de votre association"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="siteUrl">URL du site</Label>
                                <Input
                                    id="siteUrl"
                                    name="siteUrl"
                                    defaultValue={settings.siteUrl}
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={settings.description || ""}
                                placeholder="Décrivez votre association..."
                                className="h-24"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Coordonnées */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Coordonnées
                        </CardTitle>
                        <CardDescription>
                            Informations de contact de l'association
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={settings.email || ""}
                                    placeholder="contact@..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Téléphone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    defaultValue={settings.phone || ""}
                                    placeholder="+221..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Adresse
                            </Label>
                            <Textarea
                                id="address"
                                name="address"
                                defaultValue={settings.address || ""}
                                placeholder="Adresse complète..."
                                className="h-20"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Réseaux sociaux */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Réseaux Sociaux
                        </CardTitle>
                        <CardDescription>
                            Liens vers vos profils sur les réseaux sociaux
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                                <Facebook className="h-4 w-4" />
                                Facebook
                            </Label>
                            <Input
                                id="facebookUrl"
                                name="facebookUrl"
                                defaultValue={settings.facebookUrl || ""}
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                                <Instagram className="h-4 w-4" />
                                Instagram
                            </Label>
                            <Input
                                id="instagramUrl"
                                name="instagramUrl"
                                defaultValue={settings.instagramUrl || ""}
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
                                <Youtube className="h-4 w-4" />
                                YouTube
                            </Label>
                            <Input
                                id="youtubeUrl"
                                name="youtubeUrl"
                                defaultValue={settings.youtubeUrl || ""}
                                placeholder="https://youtube.com/@..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsappUrl" className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </Label>
                            <Input
                                id="whatsappUrl"
                                name="whatsappUrl"
                                defaultValue={settings.whatsappUrl || ""}
                                placeholder="https://wa.me/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telegramUrl" className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                Telegram
                            </Label>
                            <Input
                                id="telegramUrl"
                                name="telegramUrl"
                                defaultValue={settings.telegramUrl || ""}
                                placeholder="https://t.me/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tiktokUrl" className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                </svg>
                                TikTok
                            </Label>
                            <Input
                                id="tiktokUrl"
                                name="tiktokUrl"
                                defaultValue={settings.tiktokUrl || ""}
                                placeholder="https://tiktok.com/@..."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Informations bancaires */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informations Bancaires</CardTitle>
                        <CardDescription>
                            Coordonnées bancaires pour les dons
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bankName">Nom de la banque</Label>
                                <Input
                                    id="bankName"
                                    name="bankName"
                                    defaultValue={settings.bankName || ""}
                                    placeholder="Ex: Banque Islamique du Sénégal"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Numéro de compte</Label>
                                <Input
                                    id="accountNumber"
                                    name="accountNumber"
                                    defaultValue={settings.accountNumber || ""}
                                    placeholder="IBAN ou numéro de compte"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mobilePayment">Paiement Mobile (Wave, Orange Money, etc.)</Label>
                            <Input
                                id="mobilePayment"
                                name="mobilePayment"
                                defaultValue={settings.mobilePayment || ""}
                                placeholder="+221 XX XXX XX XX"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                        Annuler
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </div>
    );
}
