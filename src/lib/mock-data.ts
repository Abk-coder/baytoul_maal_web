export type PostType = "video" | "article" | "audio";

export interface Post {
    id: string;
    title: string;
    type: PostType;
    category: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
    mediaUrl?: string;
    tags: string[];
}

export const posts: Post[] = [
    {
        id: "1",
        title: "L'importance de la Zakat",
        type: "video",
        category: "Fiqh",
        date: "20 Oct 2023",
        excerpt: "Découvrez les règles essentielles concernant l'aumône légale et son impact social.",
        content: `
      <p>La Zakat est le troisième pilier de l'Islam. Elle purifie les biens et l'âme du croyant.</p>
      <p>Dans cette vidéo, nous abordons les points suivants :</p>
      <ul>
        <li>Les conditions d'obligation</li>
        <li>Le calcul du Nissab</li>
        <li>Les bénéficiaires de la Zakat</li>
      </ul>
      <p>Regardez la vidéo ci-dessus pour plus de détails.</p>
    `,
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800",
        mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        tags: ["Zakat", "Fiqh", "Social"]
    },
    {
        id: "2",
        title: "Conférence : La jeunesse et l'avenir",
        type: "audio",
        category: "Conférence",
        date: "15 Oct 2023",
        excerpt: "Écoutez le replay de notre dernière conférence sur les défis de la jeunesse musulmane.",
        content: `
      <p>Notre conférence mensuelle a réuni plus de 200 jeunes autour du thème de l'avenir.</p>
      <p>Les intervenants ont insisté sur l'importance de l'éducation et de l'engagement communautaire.</p>
    `,
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder
        tags: ["Jeunesse", "Conférence", "Avenir"]
    },
    {
        id: "3",
        title: "Distribution de kits scolaires",
        type: "article",
        category: "Social",
        date: "10 Oct 2023",
        excerpt: "Retour en images sur notre action sociale de la rentrée pour les familles nécessiteuses.",
        content: `
      <p>Grâce à vos dons, nous avons pu distribuer 500 kits scolaires complets.</p>
      <p>Cette action permet à des centaines d'enfants de commencer l'année scolaire dans de bonnes conditions.</p>
      <p>Merci à tous les bénévoles qui ont participé à la logistique.</p>
    `,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        tags: ["Social", "Éducation", "Solidarité"]
    },
    {
        id: "4",
        title: "Les mérites du mois de Ramadan",
        type: "article",
        category: "Rappels",
        date: "05 Oct 2023",
        excerpt: "Préparons-nous à accueillir le mois béni avec les meilleures intentions.",
        content: `
      <p>Le Ramadan est une école de patience et de piété.</p>
      <p>Il est important de s'y préparer spirituellement et physiquement.</p>
    `,
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800",
        tags: ["Ramadan", "Spiritualité"]
    }
];

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    videoUrl?: string;
    isCompleted?: boolean;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    level: "Débutant" | "Intermédiaire" | "Avancé";
    thumbnail: string;
    lessons: Lesson[];
    instructor: string;
}

export const courses: Course[] = [
    {
        id: "1",
        title: "Introduction au Tajwid",
        description: "Apprenez les règles fondamentales de la récitation du Coran.",
        level: "Débutant",
        thumbnail: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800",
        instructor: "Oustaz Alioune",
        lessons: [
            { id: "1-1", title: "Les points de sortie des lettres (Makharij)", duration: "15:00", videoUrl: "https://www.youtube.com/embed/..." },
            { id: "1-2", title: "Les règles du Noun Sakina", duration: "20:00" },
            { id: "1-3", title: "Les prolongations (Madd)", duration: "18:00" }
        ]
    },
    {
        id: "2",
        title: "Comprendre la Prière",
        description: "Une étude détaillée des piliers et obligations de la Salat.",
        level: "Débutant",
        thumbnail: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=800",
        instructor: "Imam Moussa",
        lessons: [
            { id: "2-1", title: "Les conditions de validité", duration: "12:00" },
            { id: "2-2", title: "Les piliers de la prière", duration: "25:00" },
            { id: "2-3", title: "Les actes détestables", duration: "10:00" }
        ]
    },
    {
        id: "3",
        title: "Histoire des Prophètes",
        description: "Découvrez la vie et les enseignements des messagers d'Allah.",
        level: "Intermédiaire",
        thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800",
        instructor: "Oustaz Abdoulaye",
        lessons: [
            { id: "3-1", title: "Adam (AS) - Le premier homme", duration: "30:00" },
            { id: "3-2", title: "Nuh (AS) - L'arche du salut", duration: "28:00" }
        ]
    }
];
