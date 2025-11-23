import prisma from "../src/lib/prisma";

async function seedEducationAndQuiz() {
    console.log("🌱 Seeding Education and Quiz data...");

    // 1. Seed Courses (from mock-data.ts)
    const courses = [
        {
            title: "Introduction au Tajwid",
            description: "Apprenez les règles fondamentales de la récitation du Coran.",
            level: "BEGINNER" as const,
            thumbnailUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800",
            instructor: "Oustaz Alioune",
            lessons: [
                { title: "Les points de sortie des lettres (Makharij)", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", position: 1 },
                { title: "Les règles du Noun Sakina", videoUrl: null, position: 2 },
                { title: "Les prolongations (Madd)", videoUrl: null, position: 3 }
            ]
        },
        {
            title: "Comprendre la Prière",
            description: "Une étude détaillée des piliers et obligations de la Salat.",
            level: "BEGINNER" as const,
            thumbnailUrl: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=800",
            instructor: "Imam Moussa",
            lessons: [
                { title: "Les conditions de validité", videoUrl: null, position: 1 },
                { title: "Les piliers de la prière", videoUrl: null, position: 2 },
                { title: "Les actes détestables", videoUrl: null, position: 3 }
            ]
        },
        {
            title: "Histoire des Prophètes",
            description: "Découvrez la vie et les enseignements des messagers d'Allah.",
            level: "INTERMEDIATE" as const,
            thumbnailUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800",
            instructor: "Oustaz Abdoulaye",
            lessons: [
                { title: "Adam (AS) - Le premier homme", videoUrl: null, position: 1 },
                { title: "Nuh (AS) - L'arche du salut", videoUrl: null, position: 2 }
            ]
        }
    ];

    for (const courseData of courses) {
        const { lessons, ...courseInfo } = courseData;

        // Check if course exists
        const existingCourse = await prisma.course.findFirst({ where: { title: courseInfo.title } });
        if (existingCourse) {
            console.log(`ℹ️  Course already exists: ${courseInfo.title}`);
        } else {
            await prisma.course.create({
                data: {
                    ...courseInfo,
                    lessons: {
                        create: lessons
                    }
                }
            });
            console.log(`✅ Created course: ${courseInfo.title}`);
        }
    }

    // 2. Seed Quiz (from quiz-game.tsx)
    const quizData = {
        title: "Quiz Islamique Général",
        description: "Testez vos connaissances générales sur l'Islam.",
        questions: [
            {
                text: "Combien y a-t-il de piliers de l'Islam ?",
                explanation: "Les 5 piliers sont : La Shahada, la Prière, la Zakat, le Jeûne et le Pèlerinage.",
                order: 1,
                answers: [
                    { text: "3", isCorrect: false },
                    { text: "5", isCorrect: true },
                    { text: "6", isCorrect: false },
                    { text: "7", isCorrect: false }
                ]
            },
            {
                text: "Quel prophète a construit l'Arche ?",
                explanation: "Le prophète Nuh (Noé) a construit l'arche sur ordre d'Allah pour échapper au déluge.",
                order: 2,
                answers: [
                    { text: "Moussa (AS)", isCorrect: false },
                    { text: "Ibrahim (AS)", isCorrect: false },
                    { text: "Nuh (AS)", isCorrect: true },
                    { text: "Issa (AS)", isCorrect: false }
                ]
            },
            {
                text: "Quelle sourate est surnommée 'Le Cœur du Coran' ?",
                explanation: "Le Prophète (paix et bénédiction sur lui) a dit que Ya-Sin est le cœur du Coran.",
                order: 3,
                answers: [
                    { text: "Al-Fatiha", isCorrect: false },
                    { text: "Al-Baqara", isCorrect: false },
                    { text: "Ya-Sin", isCorrect: true },
                    { text: "Al-Mulk", isCorrect: false }
                ]
            },
            {
                text: "En quelle année a eu lieu l'Hégire ?",
                explanation: "L'Hégire (émigration vers Médine) a eu lieu en 622 après J.C.",
                order: 4,
                answers: [
                    { text: "610", isCorrect: false },
                    { text: "622", isCorrect: true },
                    { text: "632", isCorrect: false },
                    { text: "570", isCorrect: false }
                ]
            },
            {
                text: "Combien de fois par jour le musulman doit-il prier ?",
                explanation: "Les 5 prières obligatoires sont : Fajr, Dhuhr, Asr, Maghrib et Isha.",
                order: 5,
                answers: [
                    { text: "3", isCorrect: false },
                    { text: "4", isCorrect: false },
                    { text: "5", isCorrect: true },
                    { text: "6", isCorrect: false }
                ]
            }
        ]
    };

    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findFirst({ where: { title: quizData.title } });

    if (existingQuiz) {
        console.log(`ℹ️ Quiz already exists: ${quizData.title}`);
    } else {
        await prisma.quiz.create({
            data: {
                title: quizData.title,
                description: quizData.description,
                questions: {
                    create: quizData.questions.map(q => ({
                        text: q.text,
                        explanation: q.explanation,
                        order: q.order,
                        answers: {
                            create: q.answers
                        }
                    }))
                }
            }
        });
        console.log(`✅ Created quiz: ${quizData.title}`);
    }

    console.log("✨ Education and Quiz data seeded successfully!");
}

seedEducationAndQuiz()
    .catch((e) => {
        console.error("❌ Error seeding data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
