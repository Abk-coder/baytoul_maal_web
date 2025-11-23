import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez l'association Baytul Maal pour toute question, suggestion ou demande d'information.",
};

export default async function ContactPage() {
    const settings = await prisma.settings.findUnique({
        where: { id: "default-settings" }
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
                        Contactez-nous
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question ou suggestion.
                    </p>
                </div>

                {/* Contact Info Cards - Horizontal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {settings?.email && (
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-emerald-100 rounded-lg mb-3">
                                        <Mail className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                    <a href={`mailto:${settings.email}`} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                                        {settings.email}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {settings?.phone && (
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-emerald-100 rounded-lg mb-3">
                                        <Phone className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
                                    <a href={`tel:${settings.phone}`} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                                        {settings.phone}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {settings?.address && (
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-emerald-100 rounded-lg mb-3">
                                        <MapPin className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
                                    <p className="text-sm text-gray-600">
                                        {settings.address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Map and Form - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map Section */}
                    <Card className="border-none shadow-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-gray-900">
                                Notre Localisation
                            </CardTitle>
                            <p className="text-muted-foreground">
                                Visitez-nous à notre siège
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="w-full h-[500px] bg-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.9697434634!2d-17.447938!3d14.693425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10d4f3d9d3b8d%3A0x3e1b0e0e0e0e0e0e!2sDakar%2C%20Senegal!5e0!3m2!1sen!2ssn!4v1234567890"
                                    width="100%"
                                    height="500"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localisation Baytul Maal"
                                ></iframe>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <Card className="border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-gray-900">
                                Envoyez-nous un message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input id="firstName" name="firstName" required placeholder="Votre prénom" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input id="lastName" name="lastName" required placeholder="Votre nom" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="votre@email.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone (optionnel)</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="+221..." />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Sujet</Label>
                                    <Input id="subject" name="subject" required placeholder="Objet de votre message" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        placeholder="Votre message..."
                                        className="h-32"
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                                    <Send className="mr-2 h-4 w-4" />
                                    Envoyer le message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
