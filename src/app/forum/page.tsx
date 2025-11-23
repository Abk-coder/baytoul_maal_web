"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Clock, PlusCircle, Search, TrendingUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const topics = [
    {
        id: 1,
        title: "Organisation du prochain Iftar collectif",
        author: "Amadou Diallo",
        category: "Événements",
        replies: 15,
        views: 124,
        lastActivity: "Il y a 2h",
        excerpt: "Salam aleykoum, je propose qu'on organise un grand iftar collectif le weekend prochain..."
    },
    {
        id: 2,
        title: "Question sur les horaires de prière",
        author: "Fatou Sow",
        category: "Fiqh",
        replies: 8,
        views: 89,
        lastActivity: "Il y a 5h",
        excerpt: "Bonjour, j'aimerais avoir des précisions sur le calcul des horaires de prière à Dakar..."
    },
    {
        id: 3,
        title: "Idées pour la collecte de vêtements",
        author: "Moussa Ndiaye",
        category: "Social",
        replies: 23,
        views: 210,
        lastActivity: "Hier",
        excerpt: "Nous pourrions organiser une grande collecte de vêtements pour les familles dans le besoin..."
    },
    {
        id: 4,
        title: "Retour sur le cours de Tajwid",
        author: "Aissatou Ba",
        category: "Éducation",
        replies: 5,
        views: 45,
        lastActivity: "Il y a 2j",
        excerpt: "Le cours de Tajwid de samedi dernier était vraiment enrichissant. Merci au professeur..."
    },
    {
        id: 5,
        title: "Proposition de sortie éducative",
        author: "Ibrahima Fall",
        category: "Événements",
        replies: 12,
        views: 98,
        lastActivity: "Il y a 3j",
        excerpt: "Et si on organisait une visite à la mosquée de Touba pour les jeunes de l'association..."
    },
    {
        id: 6,
        title: "Aide pour mémorisation du Coran",
        author: "Khadija Sarr",
        category: "Éducation",
        replies: 18,
        views: 156,
        lastActivity: "Il y a 4j",
        excerpt: "Quelles sont vos méthodes pour faciliter la mémorisation du Coran? Je cherche des conseils..."
    }
];

const categories = ["Général", "Événements", "Fiqh", "Social", "Éducation", "Annonces"];

export default function ForumPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTopics = topics.filter(topic => {
        const matchesCategory = !selectedCategory || topic.category === selectedCategory;
        const matchesSearch = !searchQuery ||
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col gap-8 pb-16">
            {/* Header */}
            <section className="bg-primary/5 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-3xl font-bold font-serif text-primary">Forum de Discussion</h1>
                            <p className="text-muted-foreground">
                                Espace d'échange et d'entraide pour les membres de l'association.
                            </p>
                        </div>
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Nouveau Sujet
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistiques</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Sujets</span>
                                    <span className="font-bold">{topics.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Messages</span>
                                    <span className="font-bold">{topics.reduce((acc, t) => acc + t.replies, 0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Membres actifs</span>
                                    <span className="font-bold">42</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Catégories</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant={selectedCategory === null ? "default" : "ghost"}
                                    className="w-full justify-start font-normal"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    Toutes les catégories
                                </Button>
                                {categories.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "ghost"}
                                        className="w-full justify-start font-normal"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main List */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher un sujet..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter Info */}
                        {(selectedCategory || searchQuery) && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{filteredTopics.length} résultat(s)</span>
                                {selectedCategory && (
                                    <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
                                        {selectedCategory} ×
                                    </Badge>
                                )}
                                {searchQuery && (
                                    <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                                        "{searchQuery}" ×
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Topics */}
                        <div className="space-y-4">
                            {filteredTopics.length === 0 ? (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">Aucun sujet trouvé</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                filteredTopics.map((topic) => (
                                    <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <Link href={`/forum/${topic.id}`}>
                                                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Badge variant="outline" className="text-xs font-normal">
                                                                {topic.category}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Users className="h-3 w-3" />
                                                                {topic.author}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                                            {topic.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {topic.excerpt}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                                                        <div className="flex flex-col items-center">
                                                            <span className="font-bold text-foreground">{topic.replies}</span>
                                                            <span className="text-xs">Réponses</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <span className="font-bold text-foreground">{topic.views}</span>
                                                            <span className="text-xs">Vues</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                                                            <Clock className="h-3 w-3" />
                                                            {topic.lastActivity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
