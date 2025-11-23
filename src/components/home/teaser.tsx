import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, HeartHandshake } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Une Communauté Unie",
        description: "Rejoignez une fraternité basée sur l'entraide et les valeurs partagées.",
    },
    {
        icon: BookOpen,
        title: "Éducation pour Tous",
        description: "Accédez à des cours et des ressources pour approfondir vos connaissances.",
    },
    {
        icon: HeartHandshake,
        title: "Solidarité Active",
        description: "Participez à nos actions sociales pour aider les plus démunis.",
    },
];

export function Teaser() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-serif text-primary">Qui sommes-nous ?</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Baytul Maal est bien plus qu'une association, c'est un projet de vie communautaire.
                            Fondée sur des principes éthiques et spirituels solides, notre mission est de promouvoir
                            l'excellence à travers l'éducation, le social et le développement personnel.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Nous œuvrons chaque jour pour bâtir des ponts entre les générations et offrir
                            un cadre propice à l'épanouissement de chacun.
                        </p>
                        <Button asChild variant="link" className="text-primary p-0 h-auto font-semibold text-lg">
                            <Link href="/association" className="flex items-center">
                                En savoir plus sur notre vision <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-6 bg-card rounded-xl shadow-sm border hover:shadow-md transition-shadow ${index === 2 ? 'sm:col-span-2' : ''}`}
                            >
                                <feature.icon className="h-10 w-10 text-secondary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
