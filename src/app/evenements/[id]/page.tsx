import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Phone, Mail, Video, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { RegistrationModal } from "@/components/events/registration-modal";
import { AddToCalendarButton } from "@/components/events/add-to-calendar";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const event = await prisma.event.findUnique({
        where: { slug: id },
    });

    if (!event) {
        return {
            title: "Événement non trouvé",
        };
    }

    return {
        title: event.title,
        description: event.description.substring(0, 160),
        openGraph: {
            title: event.title,
            description: event.description.substring(0, 160),
            images: event.imageUrl ? [event.imageUrl] : [],
            type: "website",
        },
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await prisma.event.findUnique({
        where: { slug: id },
    });

    if (!event) {
        notFound();
    }

    const organizers = event.organizers ? JSON.parse(event.organizers) : [];
    const isFull = event.capacity ? event.registered >= event.capacity : false;

    return (
        <div className="flex flex-col gap-8 pb-16">
            {/* Hero Image */}
            <div className="relative h-[400px] overflow-hidden bg-muted">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Calendar className="h-32 w-32 text-primary/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        {event.category && (
                            <Badge className="bg-secondary text-secondary-foreground mb-4">
                                {event.category}
                            </Badge>
                        )}
                        <h1 className="text-4xl font-bold font-serif text-white mb-4">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold font-serif text-primary mb-4">À propos de l'événement</h2>
                                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                                    {event.description}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Video */}
                        {event.videoUrl && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold font-serif text-primary mb-4 flex items-center gap-2">
                                        <Video className="h-6 w-6" />
                                        Présentation Vidéo
                                    </h2>
                                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                                        <video
                                            className="w-full h-full"
                                            controls
                                            poster={event.imageUrl || undefined}
                                        >
                                            <source src={event.videoUrl} type="video/mp4" />
                                            Votre navigateur ne supporte pas la lecture de vidéos.
                                        </video>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        Vidéo informative partagée par les organisateurs de l'événement.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Gallery */}
                        {event.galleryUrls && event.galleryUrls.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold font-serif text-primary mb-4 flex items-center gap-2">
                                        <Camera className="h-6 w-6" />
                                        Galerie Photos
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {event.galleryUrls.map((url, index) => (
                                            <Dialog key={index}>
                                                <DialogTrigger asChild>
                                                    <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                                        <img
                                                            src={url}
                                                            alt={`Photo ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/90 border-none">
                                                    <div className="relative w-full h-[80vh] flex items-center justify-center">
                                                        <img
                                                            src={url}
                                                            alt={`Photo ${index + 1}`}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Organizers */}
                        {organizers.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold font-serif text-primary mb-4">Organisateurs</h2>
                                    <div className="space-y-4">
                                        {organizers.map((org: any, index: number) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                                                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                                                    {org.name.charAt(0)}
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-bold">{org.name}</h3>
                                                    {org.phone && (
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Phone className="h-4 w-4 mr-2" />
                                                            {org.phone}
                                                        </div>
                                                    )}
                                                    {org.email && (
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Mail className="h-4 w-4 mr-2" />
                                                            {org.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Map */}
                        {event.address && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold font-serif text-primary mb-4">Localisation</h2>
                                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            src={`https://maps.google.com/maps?q=${encodeURIComponent(event.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                            allowFullScreen
                                        />
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                        {event.address}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Event Info Card */}
                        <Card className="sticky top-20">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-semibold">Date</p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(event.startDate), "EEEE d MMMM yyyy", { locale: fr })}
                                            </p>
                                        </div>
                                    </div>

                                    {event.time && (
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-semibold">Horaire</p>
                                                <p className="text-sm text-muted-foreground">{event.time}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-semibold">Lieu</p>
                                            <p className="text-sm text-muted-foreground">{event.location}</p>
                                        </div>
                                    </div>

                                    {event.capacity && (
                                        <div className="flex items-start gap-3">
                                            <Users className="h-5 w-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-semibold">Participants</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {event.registered} / {event.capacity} inscrits
                                                </p>
                                                <div className="w-full bg-muted rounded-full h-2 mt-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 pt-4 border-t">
                                    <RegistrationModal
                                        eventId={event.id}
                                        eventTitle={event.title}
                                        isFull={isFull}
                                    />

                                    <AddToCalendarButton event={event} />

                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/evenements">Retour à l'agenda</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
