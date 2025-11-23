"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, MessageSquare, ThumbsUp, Clock, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const topicData = {
    id: 1,
    title: "Organisation du prochain Iftar collectif",
    author: "Amadou Diallo",
    category: "Événements",
    createdAt: "Il y a 2 jours",
    views: 124,
    content: `Salam aleykoum wa rahmatoullah,

J'espère que vous allez tous bien. Avec l'approche du mois béni de Ramadan, je pense qu'il serait bénéfique d'organiser un grand iftar collectif pour rassembler notre communauté.

Voici quelques idées que je propose :
- Date : Le premier weekend du Ramadan
- Lieu : Centre Culturel Baytul Maal (capacité 200 personnes)
- Menu : Repas traditionnel sénégalais
- Activités : Récitation du Coran, rappel religieux

Qu'en pensez-vous ? Avez-vous des suggestions ou souhaitez-vous participer à l'organisation ?

Barakallahou fikoum.`,
    replies: [
        {
            id: 1,
            author: "Fatou Sow",
            createdAt: "Il y a 1 jour",
            content: "Wa aleykoum salam! Excellente initiative mashAllah. Je serais ravie de participer à l'organisation, notamment pour la préparation du repas. On pourrait aussi prévoir un espace pour les enfants avec des activités éducatives.",
            likes: 5
        },
        {
            id: 2,
            author: "Moussa Ndiaye",
            createdAt: "Il y a 1 jour",
            content: "Salam, très bonne idée! Je peux m'occuper de la logistique (tables, chaises, sono). Pour le menu, je suggère qu'on propose aussi une option végétarienne pour être inclusif.",
            likes: 3
        },
        {
            id: 3,
            author: "Aissatou Ba",
            createdAt: "Il y a 12 heures",
            content: "MashAllah, je suis partante! Je peux aider pour la décoration et l'organisation de l'espace enfants. On pourrait aussi inviter un imam pour un petit rappel après la rupture du jeûne.",
            likes: 4
        }
    ]
};

export default function TopicDetailPage() {
    const params = useParams();
    const [replyContent, setReplyContent] = useState("");

    const handleSubmitReply = () => {
        // This will be implemented with backend later
        console.log("Reply submitted:", replyContent);
        setReplyContent("");
    };

    return (
        <div className="flex flex-col gap-8 pb-16">
            {/* Header */}
            <section className="bg-primary/5 py-8">
                <div className="container mx-auto px-4">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/forum">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour au forum
                        </Link>
                    </Button>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge>{topicData.category}</Badge>
                            <span className="text-sm text-muted-foreground">{topicData.views} vues</span>
                        </div>
                        <h1 className="text-3xl font-bold font-serif text-primary">{topicData.title}</h1>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Original Post */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <Avatar className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                        {topicData.author.charAt(0)}
                                    </Avatar>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{topicData.author}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {topicData.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="prose prose-sm max-w-none whitespace-pre-line text-foreground">
                                        {topicData.content}
                                    </div>
                                    <div className="flex items-center gap-4 pt-4 border-t">
                                        <Button variant="ghost" size="sm">
                                            <ThumbsUp className="h-4 w-4 mr-2" />
                                            J'aime
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Répondre
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Replies */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold font-serif text-primary flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            {topicData.replies.length} Réponse{topicData.replies.length > 1 ? 's' : ''}
                        </h2>

                        {topicData.replies.map((reply) => (
                            <Card key={reply.id}>
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <Avatar className="w-10 h-10 bg-muted text-foreground flex items-center justify-center font-bold">
                                                {reply.author.charAt(0)}
                                            </Avatar>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-sm">{reply.author}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {reply.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-foreground">{reply.content}</p>
                                            <div className="flex items-center gap-4">
                                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                                    {reply.likes}
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                                    Répondre
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Reply Form */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-bold mb-4">Ajouter une réponse</h3>
                            <div className="space-y-4">
                                <Textarea
                                    placeholder="Écrivez votre réponse ici..."
                                    className="min-h-[120px]"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setReplyContent("")}>
                                        Annuler
                                    </Button>
                                    <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Publier
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
