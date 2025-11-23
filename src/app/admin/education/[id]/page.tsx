import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LessonList } from "@/components/admin/education/lesson-list";
import { CourseEditor } from "@/components/admin/education/course-editor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/education">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-serif">Modifier le Cours</h1>
                    <p className="text-muted-foreground">{course.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CourseEditor course={course} />
                </div>
                <div className="lg:col-span-1">
                    <LessonList courseId={course.id} lessons={course.lessons} />
                </div>
            </div>
        </div>
    );
}
