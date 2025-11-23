import { PostEditor } from "@/components/admin/blog/post-editor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Modifier l'article</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <PostEditor post={post} />
            </div>
        </div>
    );
}
