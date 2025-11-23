import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, GraduationCap, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Éducation",
    description: "Approfondissez vos connaissances religieuses avec nos cours structurés et accessibles à tous.",
};

export default async function EducationPage() {
    const courses = await prisma.course.findMany({
        include: {
            _count: {
                select: { lessons: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Espace Éducation</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl">
                        Approfondissez vos connaissances religieuses avec nos cours structurés et accessibles à tous.
                    </p>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course: any) => (
                        <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden border-none shadow-md">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.thumbnailUrl || "/images/course-placeholder.jpg"}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className="bg-white/90 text-emerald-800 backdrop-blur-sm">
                                        {course.level === 'BEGINNER' ? 'Débutant' :
                                            course.level === 'INTERMEDIATE' ? 'Intermédiaire' : 'Avancé'}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif line-clamp-2">
                                    {course.title}
                                </CardTitle>
                                {course.instructor && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>{course.instructor}</span>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="flex-1">
                                <p className="text-muted-foreground line-clamp-3 mb-4">
                                    {course.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course._count.lessons} leçons</span>
                                    </div>
                                    {/* Duration could be calculated if we had it in DB, for now omitted or placeholder */}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    <Link href={`/education/${course.id}`}>
                                        <PlayCircle className="w-4 h-4 mr-2" />
                                        Commencer le cours
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">Aucun cours disponible pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
