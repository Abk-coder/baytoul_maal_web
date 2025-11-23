import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Attempting to connect to database...')
        await prisma.$connect()
        console.log('Successfully connected to database!')

        const count = await prisma.user.count()
        console.log(`Found ${count} users in database.`)

    } catch (error) {
        console.error('Error connecting to database:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
