import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding events...");

    // Calculer des dates futures
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const twoWeeks = new Date(today);
    twoWeeks.setDate(today.getDate() + 14);

    const threeWeeks = new Date(today);
    threeWeeks.setDate(today.getDate() + 21);

    const oneMonth = new Date(today);
    oneMonth.setMonth(today.getMonth() + 1);

    const twoMonths = new Date(today);
    twoMonths.setMonth(today.getMonth() + 2);

    const events = [
        {
            title: "Conférence : L'éducation en Islam",
            slug: "conference-education-islam",
            description: `Rejoignez-nous pour une conférence enrichissante sur l'importance de l'éducation dans l'Islam. 
            Nos érudits partageront leurs connaissances et répondront à vos questions sur ce sujet fondamental.
            
            Cette conférence abordera plusieurs thèmes importants :
            - L'importance du savoir dans le Coran et la Sunnah
            - Les méthodes d'enseignement prophétiques
            - L'éducation des enfants selon les principes islamiques
            - Le rôle des parents et de la communauté`,
            startDate: nextWeek,
            endDate: nextWeek,
            time: "15:00 - 18:00",
            location: "Mosquée Massalikoul Djinane",
            address: "Route de l'Aéroport, Yoff, Dakar, Sénégal",
            imageUrl: "https://images.unsplash.com/photo-1564769610726-4b3c8193c1e6?w=1200&h=600&fit=crop",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "Conférence",
            capacity: 200,
            registered: 145,
            organizers: JSON.stringify([
                { name: "Cheikh Amadou Diallo", phone: "+221 77 123 45 67", email: "amadou@baytulmaal.sn" },
                { name: "Imam Moussa Ndiaye", phone: "+221 77 234 56 78", email: "moussa@baytulmaal.sn" }
            ]),
            isPublished: true,
        },
        {
            title: "Formation : Mémorisation du Coran",
            slug: "formation-memorisation-coran",
            description: `Programme intensif de mémorisation du Coran avec des méthodes éprouvées et un suivi personnalisé.
            
            Au programme :
            - Techniques de mémorisation efficaces
            - Révision et consolidation
            - Tajweed et récitation
            - Suivi individuel par des enseignants qualifiés
            
            Ouvert à tous les niveaux, débutants comme avancés.`,
            startDate: twoWeeks,
            endDate: new Date(twoWeeks.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 jours
            time: "09:00 - 17:00",
            location: "Centre Islamique Baytul Maal",
            address: "Parcelles Assainies, Dakar, Sénégal",
            imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&h=600&fit=crop",
            category: "Formation",
            capacity: 50,
            registered: 38,
            organizers: JSON.stringify([
                { name: "Ustadh Ibrahim Sarr", phone: "+221 77 345 67 89", email: "ibrahim@baytulmaal.sn" }
            ]),
            isPublished: true,
        },
        {
            title: "Action Sociale : Distribution de vivres",
            slug: "distribution-vivres",
            description: `Dans le cadre de notre programme d'aide aux familles nécessiteuses, nous organisons une grande distribution de vivres.
            
            Détails :
            - 500 kits alimentaires
            - Produits de première nécessité
            - Priorité aux familles nombreuses
            - Inscription sur place
            
            Venez nombreux pour aider ou bénéficier de cette action solidaire.`,
            startDate: threeWeeks,
            endDate: threeWeeks,
            time: "08:00 - 14:00",
            location: "Siège de l'Association",
            address: "Médina, Dakar, Sénégal",
            imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
            category: "Social",
            capacity: 500,
            registered: 320,
            organizers: JSON.stringify([
                { name: "Fatou Sow", phone: "+221 77 456 78 90", email: "fatou@baytulmaal.sn" },
                { name: "Abdou Khadre Diallo", phone: "+221 77 567 89 01", email: "abdou@baytulmaal.sn" }
            ]),
            isPublished: true,
        },
        {
            title: "Cours : Les piliers de l'Islam",
            slug: "cours-piliers-islam",
            description: `Série de cours hebdomadaires sur les cinq piliers de l'Islam, destinée aux nouveaux musulmans et à ceux qui souhaitent approfondir leurs connaissances.
            
            Programme :
            - Semaine 1 : La Shahada (attestation de foi)
            - Semaine 2 : La Salat (prière)
            - Semaine 3 : La Zakat (aumône)
            - Semaine 4 : Le Sawm (jeûne)
            - Semaine 5 : Le Hajj (pèlerinage)`,
            startDate: oneMonth,
            endDate: new Date(oneMonth.getTime() + 28 * 24 * 60 * 60 * 1000), // +28 jours
            time: "18:00 - 20:00",
            location: "Salle de conférence Baytul Maal",
            address: "Plateau, Dakar, Sénégal",
            imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=600&fit=crop",
            category: "Formation",
            capacity: 80,
            registered: 45,
            organizers: JSON.stringify([
                { name: "Cheikh Omar Ba", phone: "+221 77 678 90 12", email: "omar@baytulmaal.sn" }
            ]),
            isPublished: true,
        },
        {
            title: "Iftar Communautaire",
            slug: "iftar-communautaire",
            description: `Grand Iftar communautaire pour rassembler la communauté et partager un moment de convivialité pendant le mois béni du Ramadan.
            
            Au programme :
            - Rupture du jeûne ensemble
            - Prière du Maghrib en congrégation
            - Repas chaud pour tous
            - Moment de partage et de fraternité
            
            Ouvert à tous, gratuit. Venez nombreux avec vos familles !`,
            startDate: twoMonths,
            endDate: twoMonths,
            time: "19:00 - 21:00",
            location: "Mosquée Massalikoul Djinane",
            address: "Route de l'Aéroport, Yoff, Dakar, Sénégal",
            imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=600&fit=crop",
            category: "Social",
            capacity: 300,
            registered: 0,
            organizers: JSON.stringify([
                { name: "Comité d'organisation", phone: "+221 77 789 01 23", email: "contact@baytulmaal.sn" }
            ]),
            isPublished: true,
        },
    ];

    for (const event of events) {
        await prisma.event.upsert({
            where: { slug: event.slug },
            update: event,
            create: event,
        });
        console.log(`✅ Created/Updated event: ${event.title}`);
    }

    console.log("✨ Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
