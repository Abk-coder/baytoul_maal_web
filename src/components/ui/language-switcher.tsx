"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState("fr");

    const handleLanguageChange = (langCode: string) => {
        setCurrentLang(langCode);

        // Déclencher la traduction Google Translate
        const googleTranslateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (googleTranslateElement) {
            googleTranslateElement.value = langCode;
            googleTranslateElement.dispatchEvent(new Event('change'));
        }
    };

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Globe className="h-5 w-5" />
                    <span className="absolute -bottom-1 -right-1 text-xs">{currentLanguage.flag}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`cursor-pointer ${currentLang === lang.code ? 'bg-accent' : ''}`}
                    >
                        <span className="mr-2 text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
