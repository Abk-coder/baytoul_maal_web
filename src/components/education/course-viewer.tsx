"use client";

import { useState } from "react";
import { Course, Lesson } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, Lock, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseViewerProps {
    course: Course & { lessons: Lesson[] };
}

export function CourseViewer({ course }: CourseViewerProps) {
    const [activeLessonId, setActiveLessonId] = useState<string>(course.lessons[0]?.id);

    const activeLesson = course.lessons.find(l => l.id === activeLessonId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content (Video/Lesson) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
                    {activeLesson?.videoUrl ? (
                        <iframe
                            src={activeLesson.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/50 flex-col gap-4">
                            <PlayCircle className="w-16 h-16" />
                            <p>Sélectionnez une leçon pour commencer</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold font-serif text-primary">
                        {activeLesson?.title || course.title}
                    </h1>
                    {activeLesson?.content && (
                        <div className="prose max-w-none dark:prose-invert bg-white p-6 rounded-lg shadow-sm">
                            {activeLesson.content}
                        </div>
                    )}
                    {!activeLesson && (
                        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                            <h2 className="text-xl font-bold">À propos de ce cours</h2>
                            <p className="text-muted-foreground">{course.description}</p>
                            {course.instructor && (
                                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                                    <GraduationCap className="w-5 h-5" />
                                    <span>Enseigné par {course.instructor}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar (Lesson List) */}
            <div className="lg:col-span-1">
                <Card className="h-full border-none shadow-md">
                    <CardHeader className="bg-emerald-50 border-b border-emerald-100">
                        <CardTitle className="text-lg font-bold text-emerald-900">
                            Programme du cours
                        </CardTitle>
                        <p className="text-sm text-emerald-700">
                            {course.lessons.length} leçons
                        </p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-emerald-50">
                            {course.lessons.map((lesson, index) => {
                                const isActive = lesson.id === activeLessonId;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLessonId(lesson.id)}
                                        className={cn(
                                            "w-full text-left p-4 flex items-center gap-3 transition-colors hover:bg-emerald-50/50",
                                            isActive && "bg-emerald-50 border-l-4 border-emerald-500"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                                            isActive ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
                                        )}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn("font-medium text-sm", isActive ? "text-emerald-900" : "text-gray-700")}>
                                                {lesson.title}
                                            </p>
                                            {/* Duration placeholder if we had it */}
                                            {/* <span className="text-xs text-muted-foreground">10 min</span> */}
                                        </div>
                                        <PlayCircle className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-gray-300")} />
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
