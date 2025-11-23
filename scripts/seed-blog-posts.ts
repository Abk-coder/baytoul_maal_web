import prisma from "../src/lib/prisma";

async function seedBlogPosts() {
    console.log("🌱 Seeding blog posts...");

    const posts = [
        {
            title: "L'importance de la solidarité dans l'Islam",
            slug: "importance-solidarite-islam",
            content: `# L'importance de la solidarité dans l'Islam

La solidarité (التكافل الاجتماعي) est l'un des piliers fondamentaux de notre foi. Elle se manifeste à travers plusieurs pratiques et enseignements du Coran et de la Sunnah.

## La Zakat : Un pilier de solidarité

La Zakat n'est pas simplement une obligation rituelle, mais un système complet de redistribution des richesses qui garantit la dignité de tous les membres de la communauté.

> "Prenez de leurs biens une Sadaqa par laquelle tu les purifies et les bénis" (Sourate At-Tawbah, 9:103)

## L'entraide au quotidien

Le Prophète (ﷺ) a dit : "Le croyant est pour le croyant comme l'édifice dont les parties se soutiennent mutuellement" (Bukhari et Muslim).

## Actions concrètes

Notre association s'engage à :
- Distribuer l'aide alimentaire aux familles nécessiteuses
- Soutenir l'éducation des enfants défavorisés
- Accompagner les personnes âgées isolées
- Faciliter l'accès aux soins médicaux

Rejoignez-nous dans cette noble mission de solidarité !`,
            type: "ARTICLE" as const,
            mediaUrl: null,
            coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
            publishedAt: new Date("2025-01-15"),
            tags: "solidarité, zakat, entraide, islam",
        },
        {
            title: "Conférence : Les valeurs islamiques dans l'éducation moderne",
            slug: "conference-valeurs-islamiques-education",
            content: `# Retour sur notre conférence : Les valeurs islamiques dans l'éducation moderne

Le samedi 10 janvier 2025, notre association a eu l'honneur d'accueillir plus de 200 participants pour une conférence enrichissante sur l'éducation islamique moderne.

## Les intervenants

**Cheikh Amadou Bamba Diop** a ouvert la conférence en rappelant les fondements de l'éducation en Islam :
- Le savoir comme obligation
- L'équilibre entre sciences religieuses et sciences profanes
- Le respect du maître et de l'élève

**Dr. Fatima Ndiaye**, psychologue de l'éducation, a ensuite partagé des méthodes pratiques pour :
- Transmettre les valeurs islamiques aux enfants
- Gérer les défis de l'éducation moderne
- Créer un environnement d'apprentissage positif

## Les points clés

### 1. L'importance du bon exemple
"L'éducation par l'exemple est plus efficace que l'éducation par les mots" - Imam Al-Ghazali

### 2. L'équilibre vie spirituelle et réussite académique
Les deux ne sont pas contradictoires, mais complémentaires.

### 3. Le rôle de la communauté
L'éducation n'est pas seulement la responsabilité des parents, mais de toute la communauté.

## Vidéo de la conférence

Retrouvez l'intégralité de la conférence sur notre chaîne YouTube.

## Prochaines conférences

Inscrivez-vous à notre newsletter pour être informé de nos prochains événements !`,
            type: "VIDEO" as const,
            mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
            publishedAt: new Date("2025-01-12"),
            tags: "éducation, conférence, valeurs, jeunesse",
        },
    ];

    for (const post of posts) {
        const created = await prisma.blogPost.create({
            data: post,
        });
        console.log(`✅ Created post: ${created.title}`);
    }

    console.log("✨ Blog posts seeded successfully!");
}

seedBlogPosts()
    .catch((e) => {
        console.error("❌ Error seeding blog posts:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
