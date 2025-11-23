import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
}

export default async function BlogAdminPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Blog & Actualités</h1>
                    <p className="text-muted-foreground">Gérez les articles et les actualités.</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Nouvel article
                    </Button>
                </Link>
            </div>

            <div className="bg-card border rounded-lg shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="text-left p-4 font-medium">Titre</th>
                            <th className="text-left p-4 font-medium">Type</th>
                            <th className="text-left p-4 font-medium">Date de publication</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                    Aucun article trouvé.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post: any) => (
                                <tr key={post.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4 font-medium">
                                        <div className="truncate max-w-md" title={post.title}>
                                            {post.title}
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            {post.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        {post.publishedAt
                                            ? format(new Date(post.publishedAt), "d MMMM yyyy", { locale: fr })
                                            : "Brouillon"}
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link href={`/blog/${post.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon" title="Voir">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/blog/${post.id}`}>
                                            <Button variant="ghost" size="icon" title="Modifier">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <form action={deletePost}>
                                            <input type="hidden" name="id" value={post.id} />
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Supprimer">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
