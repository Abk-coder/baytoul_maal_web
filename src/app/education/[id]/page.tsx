import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CourseViewer } from "@/components/education/course-viewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const course = await prisma.course.findUnique({
        where: { id },
    });

    if (!course) {
        return {
            title: "Cours non trouvé",
        };
    }

    return {
        title: course.title,
        description: course.description.substring(0, 160),
        openGraph: {
            title: course.title,
            description: course.description.substring(0, 160),
            images: course.thumbnailUrl ? [course.thumbnailUrl] : [],
            type: "website",
        },
    };
}

export default async function CoursePage({ params }: PageProps) {
    const { id } = await params;

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            lessons: {
                orderBy: {
                    position: 'asc'
                }
            }
        }
    });

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
                        <Link href="/education">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux cours
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <CourseViewer course={course} />
            </div>
        </div>
    );
}
