import prisma from "../src/lib/prisma";

async function seedHistoricalData() {
    console.log("🌱 Seeding historical data...");

    // Historical blog posts (actualités passées)
    const historicalPosts = [
        {
            title: "L'importance de la Zakat",
            slug: "importance-zakat",
            content: `# L'importance de la Zakat

La Zakat est le troisième pilier de l'Islam. Elle purifie les biens et l'âme du croyant.

## Points clés abordés

- Les conditions d'obligation
- Le calcul du Nissab
- Les bénéficiaires de la Zakat

## L'impact social

La Zakat n'est pas seulement un acte d'adoration, mais aussi un système complet de redistribution des richesses qui garantit la dignité de tous les membres de la communauté.

> "Prenez de leurs biens une Sadaqa par laquelle tu les purifies et les bénis" (Sourate At-Tawbah, 9:103)`,
            type: "VIDEO" as const,
            mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            coverImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=600&fit=crop",
            publishedAt: new Date("2023-10-20"),
            tags: "zakat, fiqh, social",
        },
        {
            title: "Conférence : La jeunesse et l'avenir",
            slug: "conference-jeunesse-avenir",
            content: `# Conférence : La jeunesse et l'avenir

Notre conférence mensuelle a réuni plus de 200 jeunes autour du thème de l'avenir.

## Les thèmes abordés

### L'éducation
Les intervenants ont insisté sur l'importance de l'éducation comme fondement du développement personnel et communautaire.

### L'engagement communautaire
Comment la jeunesse peut contribuer activement au développement de la société.

### Les défis modernes
Naviguer entre tradition et modernité dans le monde contemporain.`,
            type: "AUDIO" as const,
            mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            coverImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=600&fit=crop",
            publishedAt: new Date("2023-10-15"),
            tags: "jeunesse, conférence, avenir",
        },
        {
            title: "Distribution de kits scolaires 2023",
            slug: "distribution-kits-scolaires-2023",
            content: `# Distribution de kits scolaires 2023

Grâce à vos dons, nous avons pu distribuer 500 kits scolaires complets lors de la rentrée 2023.

## Impact

Cette action permet à des centaines d'enfants de commencer l'année scolaire dans de bonnes conditions.

## Les bénéficiaires

- 500 enfants de familles nécessiteuses
- Zones ciblées : Dakar, Thiès, et Kaolack
- Contenu : cahiers, stylos, sacs, uniformes

## Remerciements

Merci à tous les bénévoles qui ont participé à la logistique et aux donateurs qui ont rendu cette action possible.`,
            type: "ARTICLE" as const,
            mediaUrl: null,
            coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
            publishedAt: new Date("2023-10-10"),
            tags: "social, éducation, solidarité",
        },
        {
            title: "Les mérites du mois de Ramadan",
            slug: "merites-ramadan",
            content: `# Les mérites du mois de Ramadan

Le Ramadan est une école de patience et de piété. Il est important de s'y préparer spirituellement et physiquement.

##Les bienfaits spirituels

### Purification de l'âme
Le jeûne purifie le cœur et renforce la conscience d'Allah.

### Multiplication des récompenses
Chaque bonne action est multipliée durant ce mois béni.

## Préparation recommandée

- Augmenter la lecture du Coran dès Chaaban
- Multiplier les actes de charité
- Renforcer les liens familiaux`,
            type: "ARTICLE" as const,
            mediaUrl: null,
            coverImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&h=600&fit=crop",
            publishedAt: new Date("2023-10-05"),
            tags: "ramadan, spiritualité",
        },
    ];

    // Historical events (événements passés)
    const historicalEvents = [
        {
            title: "Iftar Ramadan 2023",
            slug: "iftar-ramadan-2023",
            description: "Grande distribution de repas pour la rupture du jeûne. Plus de 1000 repas distribués aux personnes nécessiteuses et travailleurs de nuit.",
            startDate: new Date("2023-04-15"),
            endDate: new Date("2023-04-15"),
            time: "19:00 - 21:00",
            location: "Mosquée Massalikoul Djinane",
            address: "Route de l'Aéroport, Yoff, Dakar",
            imageUrl: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=1200&h=600&fit=crop",
            videoUrl: null,
            category: "Social",
            capacity: 1000,
            organizers: JSON.stringify([
                { name: "Cheikh Amadou Diop", phone: "+221771234567", email: "amadou@baytulmaal.sn" }
            ]),
            isPublished: true,
            registered: 850,
        },
        {
            title: "Journée de sensibilisation à la Zakat",
            slug: "journee-sensibilisation-zakat-2023",
            description: "Conférence et ateliers pratiques sur le calcul de la Zakat et son importance dans la solidarité sociale.",
            startDate: new Date("2023-09-23"),
            endDate: new Date("2023-09-23"),
            time: "14:00 - 18:00",
            location: "Centre Culturel Baytul Maal",
            address: "Medina, Dakar",
            imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
            videoUrl: null,
            category: "Formation",
            capacity: 200,
            organizers: JSON.stringify([
                { name: "Imam Moussa Seck", phone: "+221779876543", email: "moussa@baytulmaal.sn" }
            ]),
            isPublished: true,
            registered: 187,
        },
        {
            title: "Collecte de vêtements d'hiver 2023",
            slug: "collecte-vetements-hiver-2023",
            description: "Grande collecte et distribution de vêtements chauds pour les familles défavorisées avant l'hiver.",
            startDate: new Date("2023-11-10"),
            endDate: new Date("2023-11-10"),
            time: "09:00 - 17:00",
            location: "Plusieurs points de collecte",
            address: "Dakar, Pikine, Guédiawaye",
            imageUrl: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=1200&h=600&fit=crop",
            videoUrl: null,
            category: "Social",
            capacity: null,
            organizers: JSON.stringify([
                { name: "Fatima Ndiaye", phone: "+221775551234", email: "fatima@baytulmaal.sn" }
            ]),
            isPublished: true,
            registered: 45,
        },
    ];

    // Create blog posts
    for (const post of historicalPosts) {
        const created = await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: post,
            create: post,
        });
        console.log(`✅ Created/Updated post: ${created.title}`);
    }

    // Create events
    for (const event of historicalEvents) {
        const created = await prisma.event.upsert({
            where: { slug: event.slug },
            update: event,
            create: event,
        });
        console.log(`✅ Created/Updated event: ${created.title}`);
    }

    console.log("✨ Historical data seeded successfully!");
}

seedHistoricalData()
    .catch((e) => {
        console.error("❌ Error seeding historical data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
