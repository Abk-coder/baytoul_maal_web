import { createClient } from '@/lib/utils/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Calendar,
    FileText,
    GraduationCap,
    HelpCircle,
    Users,
    TrendingUp,
    Clock,
    CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    // Fetch statistics
    const [
        totalEvents,
        upcomingEvents,
        totalPosts,
        publishedPosts,
        totalCourses,
        totalQuizzes,
        recentRegistrations,
        recentPosts
    ] = await Promise.all([
        prisma.event.count(),
        prisma.event.count({ where: { startDate: { gte: new Date() } } }),
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { publishedAt: { not: null } } }),
        prisma.course.count(),
        prisma.quiz.count(),
        prisma.eventRegistration.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { event: true }
        }),
        prisma.blogPost.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            where: { publishedAt: { not: null } }
        })
    ])

    const stats = [
        {
            title: "Événements",
            value: totalEvents,
            description: `${upcomingEvents} à venir`,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            link: "/admin/evenements"
        },
        {
            title: "Articles",
            value: totalPosts,
            description: `${publishedPosts} publiés`,
            icon: FileText,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
            link: "/admin/blog"
        },
        {
            title: "Cours",
            value: totalCourses,
            description: "Modules éducatifs",
            icon: GraduationCap,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            link: "/admin/education"
        },
        {
            title: "Quiz",
            value: totalQuizzes,
            description: "Quiz disponibles",
            icon: HelpCircle,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            link: "/admin/quiz"
        }
    ]

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Dashboard Admin</h1>
                    <p className="text-muted-foreground mt-1">Vue d'ensemble de votre plateforme</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <form action={logout}>
                        <Button variant="outline">Se déconnecter</Button>
                    </form>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.link}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Registrations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Inscriptions Récentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentRegistrations.length > 0 ? (
                                recentRegistrations.map((registration) => (
                                    <div key={registration.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Users className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">
                                                {registration.firstName} {registration.lastName}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {registration.event.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(registration.createdAt).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Aucune inscription récente
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            Articles Récents
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`}>
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="p-2 bg-emerald-100 rounded-full">
                                                <FileText className="h-4 w-4 text-emerald-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {post.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Aucun article récent
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/evenements/new">
                                <Calendar className="mr-2 h-4 w-4" />
                                Nouvel Événement
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/blog/new">
                                <FileText className="mr-2 h-4 w-4" />
                                Nouvel Article
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/education/new">
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Nouveau Cours
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                            <Link href="/admin/quiz/new">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Nouveau Quiz
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
