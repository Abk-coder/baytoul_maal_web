import { createClient } from '@supabase/supabase-js'
import prisma from '../src/lib/prisma'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env')
    process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
})

async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL || 'admin@baytulmaal.sn'
    const password = process.env.ADMIN_PASSWORD || 'AdminBaytul2024!'

    console.log(`Creating admin user: ${email}`)

    // Check if user exists in Supabase Auth
    const { data: users } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = users.users.find(u => u.email === email)

    let userId: string

    if (existingUser) {
        console.log('User already exists in Supabase Auth. Updating password...')
        const { error } = await supabaseAdmin.auth.admin.updateUserById(
            existingUser.id,
            { password: password, email_confirm: true }
        )
        if (error) {
            console.error('Error updating user:', error)
            return
        }
        console.log('Password updated successfully!')
        userId = existingUser.id
    } else {
        // Create user in Supabase Auth
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: 'ADMIN' }
        })

        if (error) {
            console.error('Error creating user in Supabase Auth:', error)
            return
        }
        console.log('Admin user created in Supabase Auth:', data.user.id)
        userId = data.user.id
    }

    // Sync with Prisma User table
    try {
        const existingPrismaUser = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (existingPrismaUser) {
            console.log('User already exists in Prisma database')
        } else {
            await prisma.user.create({
                data: {
                    id: userId,
                    email,
                    role: 'ADMIN',
                }
            })
            console.log('✅ User synced to Prisma database')
        }
    } catch (error) {
        console.error('Error syncing to Prisma:', error)
    }
}

seedAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
