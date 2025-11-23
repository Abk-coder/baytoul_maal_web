import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, CreditCard, Smartphone, Building2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Faire un don",
    description: "Soutenez les actions de Baytul Maal. Faites un don sécurisé par Wave, Orange Money, Free Money ou virement bancaire.",
};

export default async function DonPage() {
    const settings = await prisma.settings.findUnique({
        where: { id: "default-settings" }
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                        <Heart className="h-10 w-10 text-emerald-600" fill="currentColor" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
                        Faire un Don
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Votre générosité nous permet de continuer notre mission de solidarité et d'entraide.
                        Chaque contribution, quelle que soit sa taille, fait une différence.
                    </p>
                </div>

                {/* Impact Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                    <Card className="border-none shadow-lg text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
                            <p className="text-sm text-muted-foreground">de vos dons sont utilisés pour nos actions</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                            <p className="text-sm text-muted-foreground">familles aidées chaque mois</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
                            <p className="text-sm text-muted-foreground">disponibilité pour les urgences</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Methods */}
                <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold font-serif text-center mb-8">Moyens de paiement</h2>

                    {/* Mobile Payment with QR Codes */}
                    {settings?.mobilePayment && (
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <Smartphone className="h-6 w-6 text-orange-600" />
                                    </div>
                                    Paiement Mobile - Scannez pour Donner
                                </CardTitle>
                                <CardDescription>
                                    Scannez le QR code avec votre application de paiement mobile
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* QR Code Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    {/* Wave QR */}
                                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all">
                                        <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-md mb-4">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${encodeURIComponent(settings.mobilePayment)}`}
                                                alt="Wave QR Code"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white mb-2">
                                            Wave
                                        </Badge>
                                        <p className="text-sm text-center text-gray-600 font-mono">
                                            {settings.mobilePayment}
                                        </p>
                                    </div>

                                    {/* Orange Money QR */}
                                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-300 hover:border-orange-500 transition-all">
                                        <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-md mb-4">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${encodeURIComponent(settings.mobilePayment)}`}
                                                alt="Orange Money QR Code"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white mb-2">
                                            Orange Money
                                        </Badge>
                                        <p className="text-sm text-center text-gray-600 font-mono">
                                            {settings.mobilePayment}
                                        </p>
                                    </div>

                                    {/* Free Money QR */}
                                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all">
                                        <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-md mb-4">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${encodeURIComponent(settings.mobilePayment)}`}
                                                alt="Free Money QR Code"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white mb-2">
                                            Free Money
                                        </Badge>
                                        <p className="text-sm text-center text-gray-600 font-mono">
                                            {settings.mobilePayment}
                                        </p>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                    <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                                        <Smartphone className="h-4 w-4" />
                                        Comment faire un don ?
                                    </h4>
                                    <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                                        <li>Ouvrez votre application de paiement mobile (Wave, Orange Money, ou Free Money)</li>
                                        <li>Scannez le QR code correspondant à votre service</li>
                                        <li>Entrez le montant de votre don</li>
                                        <li>Confirmez le paiement</li>
                                    </ol>
                                </div>

                                {/* Manual Entry Option */}
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">
                                        <strong>Ou envoyez directement au numéro :</strong>
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-bold text-gray-900 font-mono">{settings.mobilePayment}</p>
                                        <Button variant="outline" size="sm">
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copier
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bank Transfer */}
                    {(settings?.bankName || settings?.accountNumber) && (
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Building2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                    Virement Bancaire
                                </CardTitle>
                                <CardDescription>
                                    Transfert direct sur notre compte bancaire
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {settings.bankName && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Banque :</p>
                                        <p className="text-lg font-semibold text-gray-900">{settings.bankName}</p>
                                    </div>
                                )}
                                {settings.accountNumber && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-muted-foreground mb-2">Numéro de compte / IBAN :</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-mono font-bold text-gray-900">{settings.accountNumber}</p>
                                            <Button variant="outline" size="sm">
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copier
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact for other methods */}
                    <Card className="border-none shadow-xl bg-emerald-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-100 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-emerald-600" />
                                </div>
                                Autres moyens de paiement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Pour les dons en espèces, par chèque, ou pour toute autre modalité de paiement,
                                n'hésitez pas à nous contacter directement.
                            </p>
                            <div className="flex gap-4">
                                {settings?.phone && (
                                    <Button variant="outline" asChild>
                                        <a href={`tel:${settings.phone}`}>
                                            Appeler : {settings.phone}
                                        </a>
                                    </Button>
                                )}
                                {settings?.email && (
                                    <Button variant="outline" asChild>
                                        <a href={`mailto:${settings.email}`}>
                                            Email : {settings.email}
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Zakat Info */}
                <div className="max-w-4xl mx-auto mt-12">
                    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-emerald-800">
                                💚 La Zakat : Un pilier de notre foi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-700">
                                La Zakat est le troisième pilier de l'Islam. Elle purifie vos biens et aide ceux qui en ont besoin.
                            </p>
                            <div className="bg-white p-4 rounded-lg border border-emerald-100">
                                <p className="text-sm text-emerald-800 font-semibold mb-2">
                                    "Prenez de leurs biens une Sadaqa par laquelle tu les purifies et les bénis"
                                    <span className="text-muted-foreground"> - Sourate At-Tawbah (9:103)</span>
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Notre association s'engage à distribuer votre Zakat de manière transparente et équitable
                                aux bénéficiaires éligibles selon les règles islamiques.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
