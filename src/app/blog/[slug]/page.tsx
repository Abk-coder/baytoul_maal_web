import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Tag } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!post) {
        return {
            title: "Article non trouvé",
        };
    }

    return {
        title: post.title,
        description: post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.substring(0, 160),
            images: post.coverImage ? [post.coverImage] : [],
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!post || !post.publishedAt) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Hero Section with Cover Image */}
            {post.coverImage && (
                <div className="w-full h-96 relative overflow-hidden">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })}
                                    </span>
                                </div>
                                {post.tags && (
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        <span>{post.tags.split(",")[0].trim()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {!post.coverImage && (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground mb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })}
                                </span>
                            </div>
                            {post.tags && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{post.tags.split(",")[0].trim()}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Video Embed if type is VIDEO */}
                {post.type === "VIDEO" && post.mediaUrl && (
                    <div className="mb-8 rounded-lg overflow-hidden aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={post.mediaUrl.replace("watch?v=", "embed/")}
                            title={post.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Audio Player if type is AUDIO */}
                {post.type === "AUDIO" && post.mediaUrl && (
                    <div className="mb-8">
                        <audio controls className="w-full">
                            <source src={post.mediaUrl} type="audio/mpeg" />
                            Votre navigateur ne supporte pas l'élément audio.
                        </audio>
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                .split("\n")
                                .map((line: any) => {
                                    // Simple Markdown to HTML conversion
                                    if (line.startsWith("# ")) {
                                        return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`;
                                    }
                                    if (line.startsWith("## ")) {
                                        return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`;
                                    }
                                    if (line.startsWith("### ")) {
                                        return `<h3 class="text-xl font-bold mt-4 mb-2">${line.substring(4)}</h3>`;
                                    }
                                    if (line.startsWith("> ")) {
                                        return `<blockquote class="border-l-4 border-emerald-500 pl-4 italic text-gray-700 my-4">${line.substring(2)}</blockquote>`;
                                    }
                                    if (line.startsWith("- ")) {
                                        return `<li class="ml-4">${line.substring(2)}</li>`;
                                    }
                                    if (line.trim() === "") {
                                        return "<br/>";
                                    }
                                    return `<p class="mb-4 leading-relaxed text-gray-700">${line}</p>`;
                                })
                                .join(""),
                        }}
                    />
                </div>

                {/* Tags Section */}
                {post.tags && (
                    <div className="mt-12 pt-8 border-t">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.split(",").map((tag: any) => (
                                <span
                                    key={tag.trim()}
                                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-12">
                    <a
                        href="/blog"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        ← Retour aux actualités
                    </a>
                </div>
            </div>
        </div>
    );
}
