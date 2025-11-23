import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baytulmaal.sn'

    // Static routes
    const routes = [
        '',
        '/association',
        '/contact',
        '/don',
        '/blog',
        '/evenements',
        '/education',
        '/quiz',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes: Blog Posts
    const posts = await prisma.blogPost.findMany({
        where: { publishedAt: { not: null } },
        select: { slug: true, updatedAt: true },
    })

    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Events
    const events = await prisma.event.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
    })

    const eventRoutes = events.map((event) => ({
        url: `${baseUrl}/evenements/${event.slug}`,
        lastModified: event.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Courses
    const courses = await prisma.course.findMany({
        select: { id: true, updatedAt: true },
    })

    const courseRoutes = courses.map((course) => ({
        url: `${baseUrl}/education/${course.id}`,
        lastModified: course.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...postRoutes, ...eventRoutes, ...courseRoutes]
}
