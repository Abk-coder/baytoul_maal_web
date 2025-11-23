// utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

// Ce fichier ne doit être utilisé que dans des API Routes ou Server Actions
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)