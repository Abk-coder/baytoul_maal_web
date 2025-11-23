import prisma from "@/lib/prisma";
import { Calendar, MapPin, Tag } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

export default async function HistoriquePage() {
    // Fetch past events (startDate < today)
    const pastEvents = await prisma.event.findMany({
        where: {
            startDate: {
                lt: new Date(),
            },
            isPublished: true,
        },
        orderBy: {
            startDate: "desc",
        },
        take: 20,
    });

    // Fetch published blog posts
    const pastPosts = await prisma.blogPost.findMany({
        where: {
            publishedAt: {
                not: null,
                lte: new Date(),
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
        take: 20,
    });

    // Combine and sort by date
    const historyItems = [
        ...pastEvents.map((event: any) => ({
            type: 'event' as const,
            id: event.id,
            title: event.title,
            slug: event.slug,
            date: event.startDate,
            image: event.imageUrl,
            description: event.description,
            location: event.location,
        })),
        ...pastPosts.map((post: any) => ({
            type: 'post' as const,
            id: post.id,
            title: post.title,
            slug: post.slug,
            date: post.publishedAt!,
            image: post.coverImage,
            description: post.content.substring(0, 200),
            category: post.type,
        })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Historique</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl">
                        Découvrez nos événements passés et nos publications qui témoignent de notre engagement envers la communauté.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {historyItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">Aucun élément d'historique pour le moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {historyItems.map((item, index) => (
                                <div key={`${item.type}-${item.id}`} className="flex gap-6">
                                    {/* Timeline Line */}
                                    <div className="flex flex-col items-center">
                                        <div className={`w-4 h-4 rounded-full ${item.type === 'event' ? 'bg-emerald-600' : 'bg-teal-600'} border-4 border-white shadow-lg`} />
                                        {index < historyItems.length - 1 && (
                                            <div className="w-0.5 h-full bg-gradient-to-b from-emerald-200 to-teal-200 my-2" />
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 pb-8">
                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                            <div className="md:flex">
                                                {item.image && (
                                                    <div className="md:w-1/3">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-48 md:h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className={`p-6 ${item.image ? 'md:w-2/3' : 'w-full'}`}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'event'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-teal-100 text-teal-700'
                                                            }`}>
                                                            {item.type === 'event' ? 'Événement' : 'Article'}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {format(new Date(item.date), "d MMMM yyyy", { locale: fr })}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-2">
                                                        <Link
                                                            href={item.type === 'event' ? `/evenements/${item.slug}` : `/blog/${item.slug}`}
                                                            className="hover:text-emerald-600 transition-colors"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </h3>

                                                    {item.type === 'event' && 'location' in item && (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{item.location}</span>
                                                        </div>
                                                    )}

                                                    <p className="text-muted-foreground line-clamp-2 mb-4">
                                                        {item.description}
                                                    </p>

                                                    <Link
                                                        href={item.type === 'event' ? `/evenements/${item.slug}` : `/blog/${item.slug}`}
                                                        className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-2"
                                                    >
                                                        En savoir plus →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
