import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Checking events in database...\n");

    // Test 1: All events
    const allEvents = await prisma.event.findMany({
        orderBy: { startDate: "asc" },
    });

    console.log(`📊 Total events in database: ${allEvents.length}\n`);

    allEvents.forEach((event: any, index: any) => {
        console.log(`Event ${index + 1}:`);
        console.log(`  - Title: ${event.title}`);
        console.log(`  - Slug: ${event.slug}`);
        console.log(`  - Start Date: ${event.startDate}`);
        console.log(`  - Published: ${event.isPublished}`);
        console.log(`  - Location: ${event.location}`);
        console.log("");
    });

    // Test 2: Published events
    const publishedEvents = await prisma.event.findMany({
        where: { isPublished: true },
        orderBy: { startDate: "asc" },
    });

    console.log(`📢 Published events: ${publishedEvents.length}\n`);

    // Test 3: Upcoming events (like home page)
    const upcomingEvents = await prisma.event.findMany({
        where: {
            isPublished: true,
            startDate: {
                gte: new Date(),
            },
        },
        orderBy: {
            startDate: "asc",
        },
        take: 3,
    });

    console.log(`📅 Upcoming events (for home page): ${upcomingEvents.length}`);
    console.log(`Current date/time: ${new Date()}\n`);

    upcomingEvents.forEach((event: any, index: any) => {
        console.log(`Upcoming Event ${index + 1}:`);
        console.log(`  - Title: ${event.title}`);
        console.log(`  - Start Date: ${event.startDate}`);
        console.log(`  - Is future? ${new Date(event.startDate) > new Date()}`);
        console.log("");
    });
}

main()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
