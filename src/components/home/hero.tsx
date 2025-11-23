import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function Hero() {
    return (
        <section className="relative bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
            {/* Background Pattern (Abstract) */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight">
                    Servir la Communauté,<br />
                    <span className="text-secondary">Élever les Âmes</span>
                </h1>

                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                    Baytul Maal est une association dédiée à l'éducation, à la solidarité et à l'épanouissement spirituel de chacun.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-lg h-12 px-8">
                        <Link href="/don">
                            <Heart className="mr-2 h-5 w-5" />
                            Faire un don
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold text-lg h-12 px-8 bg-transparent">
                        <Link href="/association">
                            Découvrir l'Association
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
