import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award } from "lucide-react";

const activities = [
    {
        year: "2023",
        title: "Distribution de 500 Kits Scolaires",
        date: "Septembre 2023",
        location: "Écoles de Dakar et Pikine",
        description: "Distribution de fournitures scolaires complètes à 500 élèves issus de familles nécessiteuses pour faciliter leur rentrée scolaire.",
        impact: "500 élèves aidés",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop", // Livres et éducation
        category: "Éducation"
    },
    {
        year: "2023",
        title: "Iftar Solidaire du Ramadan",
        date: "Mars - Avril 2023",
        location: "Centre Culturel Baytul Maal",
        description: "Organisation d'iftars collectifs quotidiens pendant le mois de Ramadan, offrant plus de 1000 repas aux fidèles et aux personnes dans le besoin.",
        impact: "1000+ repas servis",
        image: "https://images.unsplash.com/photo-1591604129853-5eee69c440a2?w=600&h=400&fit=crop", // Dattes et repas
        category: "Social"
    },
    {
        year: "2022",
        title: "Construction d'un Puits au Village",
        date: "Juillet 2022",
        location: "Village de Keur Massar",
        description: "Forage et construction d'un puits pour fournir de l'eau potable à plus de 200 familles du village de Keur Massar.",
        impact: "200 familles bénéficiaires",
        image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop", // Architecture islamique
        category: "Humanitaire"
    },
    {
        year: "2022",
        title: "Cours de Coran et Tajwid",
        date: "Toute l'année 2022",
        location: "Siège de l'Association",
        description: "Mise en place de cours hebdomadaires de Coran et de Tajwid pour enfants et adultes, avec plus de 150 apprenants réguliers.",
        impact: "150 apprenants",
        image: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=600&h=400&fit=crop", // Coran ouvert
        category: "Éducation"
    },
    {
        year: "2021",
        title: "Campagne de Sensibilisation COVID-19",
        date: "Janvier - Juin 2021",
        location: "Quartiers de Dakar",
        description: "Distribution de masques et de gel hydroalcoolique, accompagnée de sessions de sensibilisation sur les gestes barrières.",
        impact: "5000 personnes sensibilisées",
        image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop", // Motifs islamiques
        category: "Santé"
    },
    {
        year: "2021",
        title: "Aid al-Adha : Distribution de Viande",
        date: "Juillet 2021",
        location: "Plusieurs quartiers de Dakar",
        description: "Sacrifice de moutons et distribution de viande à plus de 300 familles nécessiteuses lors de la fête de l'Aid al-Adha.",
        impact: "300 familles aidées",
        image: "https://images.unsplash.com/photo-1591604129853-5eee69c440a2?w=600&h=400&fit=crop", // Nourriture halal
        category: "Social"
    },
    {
        year: "2020",
        title: "Fondation de Baytul Maal",
        date: "Octobre 2020",
        location: "Dakar, Sénégal",
        description: "Création officielle de l'association Baytul Maal avec pour mission de servir la communauté à travers l'éducation, la solidarité et le développement spirituel.",
        impact: "Début de l'aventure",
        image: "https://images.unsplash.com/photo-1564769610726-4b3c8193c1e6?w=600&h=400&fit=crop", // Mosquée
        category: "Événement"
    },
    {
        year: "2020",
        title: "Première Conférence Publique",
        date: "Novembre 2020",
        location: "Mosquée de Médina",
        description: "Organisation de notre première conférence publique sur le thème 'L'Islam et la Solidarité' avec la participation de 200 personnes.",
        impact: "200 participants",
        image: "https://images.unsplash.com/photo-1564769610726-4b3c8193c1e6?w=600&h=400&fit=crop", // Mosquée de Médina
        category: "Conférence"
    }
];

export default function ActivitiesPage() {
    return (
        <div className="flex flex-col gap-12 pb-16">
            {/* Header */}
            <section className="bg-primary/5 py-16">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <h1 className="text-4xl font-bold font-serif text-primary">Historique de nos Activités</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Retour sur les moments forts qui ont marqué la vie de notre association et de la communauté.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                            <p className="text-4xl font-bold text-primary mb-2">8+</p>
                            <p className="text-sm text-muted-foreground">Projets Réalisés</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                            <p className="text-4xl font-bold text-primary mb-2">2000+</p>
                            <p className="text-sm text-muted-foreground">Bénéficiaires</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <MapPin className="h-12 w-12 text-secondary mx-auto mb-4" />
                            <p className="text-4xl font-bold text-primary mb-2">15+</p>
                            <p className="text-sm text-muted-foreground">Localités Touchées</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
                            <p className="text-4xl font-bold text-primary mb-2">4</p>
                            <p className="text-sm text-muted-foreground">Années d'Existence</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Timeline */}
            <section className="container mx-auto px-4">
                <div className="space-y-12">
                    {activities.map((activity, index) => (
                        <div key={index} className="relative">
                            {/* Year marker */}
                            {(index === 0 || activities[index - 1].year !== activity.year) && (
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-2xl font-serif">
                                        {activity.year}
                                    </div>
                                    <div className="flex-1 h-px bg-border" />
                                </div>
                            )}

                            {/* Activity card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                                    />
                                </div>
                                <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                                    <Badge className="mb-4">{activity.category}</Badge>
                                    <h3 className="text-2xl font-bold font-serif text-primary mb-3">
                                        {activity.title}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {activity.date}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            {activity.location}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {activity.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full font-semibold">
                                        <Award className="h-4 w-4" />
                                        {activity.impact}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
