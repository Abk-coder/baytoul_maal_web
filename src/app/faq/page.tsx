import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Foire Aux Questions (FAQ)",
    description: "Trouvez les réponses à vos questions sur l'association Baytul Maal, les dons et nos activités.",
};

export default function FAQPage() {
    const faqs = [
        {
            category: "Général",
            items: [
                {
                    question: "Qu'est-ce que Baytul Maal ?",
                    answer: "Baytul Maal est une association à but non lucratif dédiée à l'éducation, à la solidarité sociale et à la promotion des valeurs islamiques. Nous organisons des cours, des événements caritatifs et des campagnes de soutien pour les plus démunis."
                },
                {
                    question: "Comment puis-je devenir membre ?",
                    answer: "Pour devenir membre, vous pouvez nous contacter via notre formulaire de contact ou vous rendre directement à notre siège. L'adhésion est ouverte à toute personne partageant nos valeurs et souhaitant contribuer à nos actions."
                },
                {
                    question: "Où êtes-vous situés ?",
                    answer: "Notre siège social est situé à Dakar, Sénégal. Vous pouvez trouver notre adresse exacte et notre localisation sur la page Contact."
                }
            ]
        },
        {
            category: "Dons & Soutien",
            items: [
                {
                    question: "Comment faire un don ?",
                    answer: "Vous pouvez faire un don via Orange Money, Wave, virement bancaire ou en espèces. Rendez-vous sur notre page 'Faire un don' pour voir toutes les options disponibles et les QR codes."
                },
                {
                    question: "Mes dons sont-ils déductibles des impôts ?",
                    answer: "Oui, en tant qu'association reconnue d'utilité publique, nous pouvons vous fournir un reçu fiscal pour vos dons sur demande."
                },
                {
                    question: "Puis-je parrainer un étudiant ou une famille ?",
                    answer: "Absolument. Nous avons des programmes de parrainage pour les étudiants en sciences islamiques et pour les familles nécessiteuses. Contactez-nous pour mettre en place un parrainage."
                }
            ]
        },
        {
            category: "Activités & Éducation",
            items: [
                {
                    question: "Les cours sont-ils gratuits ?",
                    answer: "La plupart de nos conférences publiques sont gratuites. Certains cours structurés ou formations spécifiques peuvent demander une participation symbolique pour couvrir les frais logistiques."
                },
                {
                    question: "Proposez-vous des cours en ligne ?",
                    answer: "Oui, nous développons notre plateforme d'éducation en ligne. Vous pouvez accéder à des cours vidéo et des ressources pédagogiques dans notre section Éducation."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold font-serif text-center mb-4 text-primary">Foire Aux Questions</h1>
                <p className="text-center text-muted-foreground mb-12">
                    Vous avez des questions ? Nous avons les réponses.
                </p>

                <div className="space-y-8">
                    {faqs.map((category, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-bold text-primary mb-4">{category.category}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item, itemIndex) => (
                                    <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                                        <AccordionTrigger className="text-left font-medium hover:text-emerald-600">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                        Vous ne trouvez pas la réponse à votre question ?
                    </p>
                    <a href="/contact" className="text-emerald-600 font-semibold hover:underline mt-2 inline-block">
                        Contactez-nous directement
                    </a>
                </div>
            </div>
        </div>
    );
}
