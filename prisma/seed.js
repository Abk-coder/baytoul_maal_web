const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Creating admin user...');

    const hashedPassword = await bcrypt.hashSync('AdminBaytul2024!', 10);

    try {
        const admin = await prisma.user.upsert({
            where: { email: 'admin@baytulmaal.sn' },
            update: {},
            create: {
                email: 'admin@baytulmaal.sn',
                name: 'Administrateur',
                password: hashedPassword,
                role: 'ADMIN'
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@baytulmaal.sn');
        console.log('Password: AdminBaytul2024!');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
