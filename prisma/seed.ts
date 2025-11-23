const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('AdminBaytul2024!', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@baytulmaal.sn' },
        update: {},
        create: {
            email: 'admin@baytulmaal.sn',
            name: 'Administrateur',
            password: hashedPassword,
            role: 'ADMIN'
        }
    })

    console.log('✅ Admin user created:', admin.email)
    console.log('📧 Email: admin@baytulmaal.sn')
    console.log('🔑 Password: AdminBaytul2024!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
