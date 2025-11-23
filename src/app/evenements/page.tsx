import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Événements",
    description: "Découvrez nos prochaines activités et événements. Rejoignez-nous pour partager des moments enrichissants.",
};

export default async function EventsPage() {
    const events = await prisma.event.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            startDate: "asc",
        },
    });

    return (
        <div className="flex flex-col gap-12 pb-16">
            {/* Header */}
            <section className="bg-primary/5 py-16">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <h1 className="text-4xl font-bold font-serif text-primary">Agenda des Événements</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez nos prochaines activités et événements. Rejoignez-nous pour partager des moments enrichissants.
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="container mx-auto px-4">
                {events.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">Aucun événement disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event: any) => (
                            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                <div className="relative h-48 overflow-hidden bg-muted flex items-center justify-center">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <Calendar className="h-16 w-16 text-muted-foreground" />
                                    )}
                                    {event.category && (
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-secondary text-secondary-foreground">
                                                {event.category}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={`/evenements/${event.slug}`}>{event.title}</Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                                        {format(new Date(event.startDate), "EEEE d MMMM yyyy", { locale: fr })}
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4 mr-2 text-primary" />
                                            {event.time}
                                        </div>
                                    )}
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                                        {event.location}
                                    </div>
                                    <Button asChild className="w-full mt-4">
                                        <Link href={`/evenements/${event.slug}`}>Voir les détails</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
