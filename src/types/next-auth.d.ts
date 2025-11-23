import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        role: string
    }

    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role: string
    }
}
