import { Hero } from "@/components/home/hero";
import { Teaser } from "@/components/home/teaser";
import { LatestNews } from "@/components/home/latest-news";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowRight, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function Home() {
  // Fetch upcoming events
  const upcomingEvents = await prisma.event.findMany({
    where: {
      isPublished: true,
      startDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      startDate: "asc",
    },
    take: 3,
  });

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />

      {/* Upcoming Events Section - PRIORITIZED */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold font-serif text-primary">Agenda des Événements</h2>
              <p className="text-lg text-muted-foreground">Ne manquez pas nos prochains événements et activités.</p>
            </div>
            <Button variant="outline" asChild size="lg">
              <Link href="/evenements">Voir tous les événements</Link>
            </Button>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Aucun événement à venir pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event: any) => {
                const eventDate = new Date(event.startDate);
                return (
                  <Card key={event.id} className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Link href={`/evenements/${event.slug}`}>
                        <div className="flex items-start gap-4">
                          <div className="bg-secondary/10 p-3 rounded-lg text-center min-w-[60px]">
                            <span className="block text-sm font-bold text-secondary uppercase">
                              {format(eventDate, "MMM", { locale: fr })}
                            </span>
                            <span className="block text-2xl font-bold text-primary">
                              {format(eventDate, "d")}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                            {event.time && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                {event.time}
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>


      <Teaser />

      <LatestNews />

      {/* Activities History Section (New) */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold font-serif text-primary">Notre Impact</h2>
            <p className="text-muted-foreground">
              Retour sur les moments forts qui ont marqué la vie de notre association et de la communauté.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: "2023", title: "500 Kits Scolaires", desc: "Distribués aux élèves nécessiteux." },
              { year: "2022", title: "Puits au Village", desc: "Construction d'un puits pour 200 familles." },
              { year: "2021", title: "Iftar Solidaire", desc: "Plus de 1000 repas servis pendant le Ramadan." },
              { year: "2020", title: "Fondation", desc: "Création de l'association Baytul Maal." },
            ].map((item, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/20 py-2">
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <span className="text-sm font-bold text-secondary mb-1 block">{item.year}</span>
                <h3 className="font-bold text-lg text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/historique">
                <History className="mr-2 h-4 w-4" />
                Voir tout l'historique
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
