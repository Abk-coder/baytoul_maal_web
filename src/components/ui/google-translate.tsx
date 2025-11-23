"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export function GoogleTranslateWidget() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "fr",
                    includedLanguages: "fr,en,ar",
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                "google_translate_element"
            );
            setIsLoaded(true);
        };
    }, []);

    return (
        <div className="flex items-center">
            <div id="google_translate_element" className="google-translate-container" />
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="lazyOnload"
            />
        </div>
    );
}
