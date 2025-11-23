import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Calendar, Users } from "lucide-react";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { deleteEvent, toggleEventPublish } from "./actions";

async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteEvent(id);
}

async function handleTogglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const isPublished = formData.get("isPublished") === "true";
    await toggleEventPublish(id, isPublished);
}

export default async function EventsAdminPage() {
    const events = await prisma.event.findMany({
        orderBy: { startDate: "desc" },
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Événements</h1>
                    <p className="text-muted-foreground">Gérez les événements et activités.</p>
                </div>
                <Link href="/admin/evenements/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Nouvel événement
                    </Button>
                </Link>
            </div>

            <div className="bg-card border rounded-lg shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="text-left p-4 font-medium">Titre</th>
                            <th className="text-left p-4 font-medium">Date</th>
                            <th className="text-left p-4 font-medium">Lieu</th>
                            <th className="text-left p-4 font-medium">Statut</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                    Aucun événement trouvé.
                                </td>
                            </tr>
                        ) : (
                            events.map((event: any) => (
                                <tr key={event.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4 font-medium">
                                        <div className="truncate max-w-md" title={event.title}>
                                            {event.title}
                                        </div>
                                        {event.category && (
                                            <span className="text-xs text-muted-foreground">{event.category}</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {format(new Date(event.startDate), "d MMM yyyy", { locale: fr })}
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        <div className="truncate max-w-xs">{event.location}</div>
                                    </td>
                                    <td className="p-4">
                                        <form action={handleTogglePublish}>
                                            <input type="hidden" name="id" value={event.id} />
                                            <input type="hidden" name="isPublished" value={(!event.isPublished).toString()} />
                                            <Button
                                                type="submit"
                                                variant={event.isPublished ? "default" : "outline"}
                                                size="sm"
                                            >
                                                {event.isPublished ? "Publié" : "Brouillon"}
                                            </Button>
                                        </form>
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link href={`/evenements/${event.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon" title="Voir">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/evenements/${event.id}/inscriptions`}>
                                            <Button variant="ghost" size="icon" title="Inscriptions">
                                                <Users className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/evenements/${event.id}`}>
                                            <Button variant="ghost" size="icon" title="Modifier">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <form action={handleDelete}>
                                            <input type="hidden" name="id" value={event.id} />
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
