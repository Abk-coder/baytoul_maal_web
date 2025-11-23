import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, PlayCircle, Mic, FileText } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export async function LatestNews() {
    const posts = await prisma.blogPost.findMany({
        where: {
            publishedAt: {
                not: null,
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
        take: 3,
    });

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold font-serif text-primary mb-2">Dernières Actualités</h2>
                        <p className="text-muted-foreground">Restez informé de nos activités et profitez de nos rappels.</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/blog">Voir tout</Link>
                    </Button>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Aucune actualité pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                <div className="relative h-48 overflow-hidden bg-muted flex items-center justify-center">
                                    {post.type === "VIDEO" && <PlayCircle className="h-16 w-16 text-muted-foreground" />}
                                    {post.type === "AUDIO" && <Mic className="h-16 w-16 text-muted-foreground" />}
                                    {post.type === "ARTICLE" && <FileText className="h-16 w-16 text-muted-foreground" />}
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground">
                                            {post.type}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {post.publishedAt && format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })}
                                    </div>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {post.content.substring(0, 150)}...
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="link" className="px-0 text-primary">
                                        <Link href={`/blog/${post.slug}`}>Lire la suite</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
