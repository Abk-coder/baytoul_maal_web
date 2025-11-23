import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export async function Footer() {
    // Charger les paramètres depuis la base de données
    const settings = await prisma.settings.findUnique({
        where: { id: "default-settings" }
    });

    return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-white text-primary w-10 h-10 rounded-lg flex items-center justify-center font-serif font-bold text-xl">
                                B
                            </div>
                            <span className="font-serif font-bold text-xl">{settings?.siteName || "Baytul Maal"}</span>
                        </Link>
                        <p className="text-primary-foreground/80 text-sm leading-relaxed">
                            {settings?.description || "Une association dévouée au service de la communauté, guidée par les valeurs de solidarité, d'éducation et d'excellence."}
                        </p>
                        <div className="flex gap-4">
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.facebookUrl}>
                                {settings?.facebookUrl ? (
                                    <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                ) : (
                                    <span>
                                        <Facebook className="h-5 w-5 opacity-50" />
                                    </span>
                                )}
                            </Button>
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.instagramUrl}>
                                {settings?.instagramUrl ? (
                                    <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                ) : (
                                    <span>
                                        <Instagram className="h-5 w-5 opacity-50" />
                                    </span>
                                )}
                            </Button>
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.youtubeUrl}>
                                {settings?.youtubeUrl ? (
                                    <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                        <Youtube className="h-5 w-5" />
                                    </a>
                                ) : (
                                    <span>
                                        <Youtube className="h-5 w-5 opacity-50" />
                                    </span>
                                )}
                            </Button>
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.whatsappUrl}>
                                {settings?.whatsappUrl ? (
                                    <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </a>
                                ) : (
                                    <span>
                                        <svg className="h-5 w-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </span>
                                )}
                            </Button>
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.telegramUrl}>
                                {settings?.telegramUrl ? (
                                    <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                        </svg>
                                    </a>
                                ) : (
                                    <span>
                                        <svg className="h-5 w-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                        </svg>
                                    </span>
                                )}
                            </Button>
                            <Button size="icon" variant="ghost" className="hover:bg-white/10 hover:text-white rounded-full" asChild={!!settings?.tiktokUrl}>
                                {settings?.tiktokUrl ? (
                                    <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    </a>
                                ) : (
                                    <span>
                                        <svg className="h-5 w-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-serif font-bold text-lg text-secondary">Liens Rapides</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/association" className="hover:text-secondary transition-colors">Qui sommes-nous ?</Link></li>
                            <li><Link href="/blog" className="hover:text-secondary transition-colors">Actualités & Blog</Link></li>
                            <li><Link href="/education" className="hover:text-secondary transition-colors">Espace Éducation</Link></li>
                            <li><Link href="/quiz" className="hover:text-secondary transition-colors">Quiz Islamique</Link></li>
                            <li><Link href="/faq" className="hover:text-secondary transition-colors">Foire Aux Questions</Link></li>
                            <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-serif font-bold text-lg text-secondary">Nous Contacter</h3>
                        <ul className="space-y-3 text-sm">
                            {settings?.address && (
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-secondary shrink-0" />
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings?.phone && (
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-secondary shrink-0" />
                                    <span>{settings.phone}</span>
                                </li>
                            )}
                            {settings?.email && (
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-secondary shrink-0" />
                                    <a href={`mailto:${settings.email}`} className="hover:text-secondary transition-colors">
                                        {settings.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="space-y-4">
                        <h3 className="font-serif font-bold text-lg text-secondary">Soutenir l'Association</h3>
                        <p className="text-sm text-primary-foreground/80">
                            Votre contribution nous aide à mener à bien nos actions sociales et éducatives.
                        </p>
                        <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                            <Link href="/don">
                                <Heart className="mr-2 h-4 w-4" />
                                Faire un don maintenant
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 text-center text-sm text-primary-foreground/60">
                    <p>&copy; {new Date().getFullYear()} {settings?.siteName || "Association Baytul Maal"}. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
