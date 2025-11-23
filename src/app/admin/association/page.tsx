import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

async function deleteMember(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.associationMember.delete({ where: { id } });
    revalidatePath("/admin/association");
}

export default async function AssociationPage() {
    const members = await prisma.associationMember.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Membres de l'Association</h1>
                    <p className="text-muted-foreground">Gérez l'équipe dirigeante et les membres.</p>
                </div>
                <Link href="/admin/association/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter un membre
                    </Button>
                </Link>
            </div>

            <div className="bg-card border rounded-lg shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="text-left p-4 font-medium">Nom</th>
                            <th className="text-left p-4 font-medium">Rôle</th>
                            <th className="text-left p-4 font-medium">Commission</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                    Aucun membre trouvé.
                                </td>
                            </tr>
                        ) : (
                            members.map((member: any) => (
                                <tr key={member.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4 font-medium">{member.name}</td>
                                    <td className="p-4 text-muted-foreground">{member.role}</td>
                                    <td className="p-4 text-muted-foreground">{member.commission || "-"}</td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link href={`/admin/association/${member.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <form action={deleteMember}>
                                            <input type="hidden" name="id" value={member.id} />
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
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
