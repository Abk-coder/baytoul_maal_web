import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { BookOpen, Calendar, GraduationCap, Users, Settings, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Aide & Support Admin",
    description: "Guide d'utilisation pour l'administration de la plateforme Baytul Maal.",
};

export default function AdminHelpPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Aide & Support</h1>
                <p className="text-muted-foreground">
                    Documentation et guides pour gérer la plateforme Baytul Maal.
                </p>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                    <TabsTrigger value="content">Blog & Événements</TabsTrigger>
                    <TabsTrigger value="education">Éducation</TabsTrigger>
                    <TabsTrigger value="association">Association</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Gestion des Utilisateurs
                            </CardTitle>
                            <CardDescription>
                                Comment gérer les comptes et les rôles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Ajouter un Administrateur ou Manager</h3>
                                <p className="text-sm text-muted-foreground">
                                    Actuellement, la gestion des rôles se fait directement via la base de données ou via une interface spécifique si elle est activée.
                                    Pour promouvoir un utilisateur, contactez l'administrateur principal.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Rôles disponibles</h3>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li><strong>ADMIN</strong>: Accès complet à toutes les fonctionnalités.</li>
                                    <li><strong>EDITOR</strong>: Peut créer et modifier du contenu (articles, événements) mais ne peut pas gérer les paramètres globaux.</li>
                                    <li><strong>USER</strong>: Utilisateur standard (membre inscrit).</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Blog & Événements
                            </CardTitle>
                            <CardDescription>
                                Création et gestion du contenu public.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Ajouter un Article de Blog</h3>
                                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Allez dans le menu <strong>Blog</strong>.</li>
                                    <li>Cliquez sur <strong>Nouvel Article</strong>.</li>
                                    <li>Remplissez le titre, le contenu et choisissez une image de couverture.</li>
                                    <li>Vous pouvez ajouter des tags séparés par des virgules.</li>
                                    <li>Cliquez sur <strong>Publier</strong> pour rendre l'article visible.</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Créer un Événement</h3>
                                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Allez dans le menu <strong>Événements</strong>.</li>
                                    <li>Cliquez sur <strong>Nouvel Événement</strong>.</li>
                                    <li>Indiquez la date, l'heure, le lieu et la capacité maximale.</li>
                                    <li>Si l'événement nécessite une inscription, les utilisateurs pourront s'inscrire via le site.</li>
                                    <li>Vous pouvez suivre les inscriptions dans l'onglet <strong>Inscriptions</strong>.</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Éducation & Quiz
                            </CardTitle>
                            <CardDescription>
                                Gestion des cours et des évaluations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Ajouter un Cours</h3>
                                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Allez dans le menu <strong>Éducation</strong>.</li>
                                    <li>Créez un nouveau cours en définissant son niveau (Débutant, Intermédiaire, Avancé).</li>
                                    <li>Une fois le cours créé, vous pouvez y ajouter des <strong>Leçons</strong>.</li>
                                    <li>Chaque leçon peut contenir une vidéo (lien YouTube) et du contenu textuel.</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Créer un Quiz</h3>
                                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Allez dans le menu <strong>Quiz</strong>.</li>
                                    <li>Créez un quiz et ajoutez-y des questions.</li>
                                    <li>Pour chaque question, définissez plusieurs réponses et cochez la bonne réponse.</li>
                                    <li>Vous pouvez ajouter une explication qui s'affichera après la réponse.</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="association" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Association & Paramètres
                            </CardTitle>
                            <CardDescription>
                                Gestion des membres et configuration du site.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Gérer les Membres du Bureau</h3>
                                <p className="text-sm text-muted-foreground">
                                    Dans la section <strong>Association</strong>, vous pouvez ajouter les membres du bureau exécutif.
                                    Leur photo et leur rôle s'afficheront sur la page publique "L'Association".
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Paramètres du Site</h3>
                                <p className="text-sm text-muted-foreground">
                                    La section <strong>Paramètres</strong> vous permet de modifier :
                                    <ul className="list-disc list-inside mt-2 ml-2">
                                        <li>Les informations de contact (email, téléphone, adresse).</li>
                                        <li>Les liens des réseaux sociaux (Facebook, Instagram, etc.).</li>
                                        <li>Les informations bancaires pour les dons.</li>
                                    </ul>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
