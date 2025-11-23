"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Calendar, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Association",
        href: "/admin/association",
        icon: Users,
    },
    {
        title: "Événements",
        href: "/admin/evenements",
        icon: Calendar,
    },
    {
        title: "Blog",
        href: "/admin/blog",
        icon: FileText,
    },
    {
        title: "Paramètres",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        title: "Aide & Support",
        href: "/admin/help",
        icon: HelpCircle,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full border-r bg-card text-card-foreground">
            <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded flex items-center justify-center">
                        B
                    </div>
                    Baytul Maal
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t">
                <form action={logout}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                    </Button>
                </form>
            </div>
        </div>
    );
}
