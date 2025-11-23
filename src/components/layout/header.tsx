"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NotificationCenter } from "@/components/ui/notifications";
import { GoogleTranslateWidget } from "@/components/ui/google-translate";

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Accueil" },
        { href: "/association", label: "L'Association" },
        { href: "/blog", label: "Médiathèque" },
        { href: "/education", label: "Éducation" },
        { href: "/quiz", label: "Quiz" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-serif font-bold text-xl">
                        B
                    </div>
                    <span className="font-serif font-bold text-xl hidden sm:inline-block text-primary">
                        Baytul Maal
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <GoogleTranslateWidget />
                    <NotificationCenter />
                    <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                        <Link href="/don">
                            <Heart className="mr-2 h-4 w-4" />
                            Faire un don
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <NotificationCenter />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 mt-8">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="px-4">
                                    <GoogleTranslateWidget />
                                </div>
                                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold mt-4">
                                    <Link href="/don" onClick={() => setIsOpen(false)}>
                                        <Heart className="mr-2 h-4 w-4" />
                                        Faire un don
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header >
    );
}
