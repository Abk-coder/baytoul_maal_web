import { OrgChart } from "@/components/association/org-chart";
import { Target, Heart, Lightbulb } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "L'Association",
    description: "Découvrez la vision, la mission et l'organisation de l'association Baytul Maal.",
};

export default function AssociationPage() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Header Section */}
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif">L'Association Baytul Maal</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        Une organisation dévouée au service de la communauté, guidée par les principes de l'Islam et l'excellence.
                    </p>
                </div>
            </section>

            {/* Vision, Mission, Valeurs */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-card p-8 rounded-xl shadow-sm border text-center space-y-4">
                        <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-secondary">
                            <Lightbulb className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-primary">Notre Vision</h2>
                        <p className="text-muted-foreground">
                            Devenir un modèle d'organisation islamique moderne, rayonnant par son impact social et éducatif.
                        </p>
                    </div>

                    <div className="bg-card p-8 rounded-xl shadow-sm border text-center space-y-4">
                        <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-secondary">
                            <Target className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-primary">Notre Mission</h2>
                        <p className="text-muted-foreground">
                            Promouvoir l'éducation, soutenir les nécessiteux et renforcer les liens fraternels au sein de la communauté.
                        </p>
                    </div>

                    <div className="bg-card p-8 rounded-xl shadow-sm border text-center space-y-4">
                        <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-secondary">
                            <Heart className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-primary">Nos Valeurs</h2>
                        <p className="text-muted-foreground">
                            Sincérité (Ikhlas), Excellence (Ihsan), Solidarité et Transparence dans toutes nos actions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Organigramme */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-serif text-primary mb-4">Notre Organisation</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Une structure hiérarchisée et dynamique pour assurer l'efficacité de nos actions.
                    </p>
                </div>
                <OrgChart />
            </section>
        </div>
    );
}
