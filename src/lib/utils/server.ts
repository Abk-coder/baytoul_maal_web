import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    // Important : await cookies() est nécessaire pour la compatibilité Next.js 15
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Nouvelle méthode : Récupérer tous les cookies d'un coup
                getAll() {
                    return cookieStore.getAll()
                },
                // Nouvelle méthode : Définir plusieurs cookies (pour login/logout)
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Le bloc try/catch est nécessaire car on ne peut pas définir de cookies
                        // depuis un Server Component (seulement depuis Server Actions ou API Routes).
                        // Cette erreur est ignorée volontairement lors du rendu côté serveur.
                    }
                },
            },
        }
    )
}