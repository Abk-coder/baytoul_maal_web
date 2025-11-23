import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔌 Testing database connection...");
    try {
        const count = await prisma.event.count();
        console.log(`✅ Connection successful! Found ${count} events.`);
    } catch (error) {
        console.error("❌ Connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
