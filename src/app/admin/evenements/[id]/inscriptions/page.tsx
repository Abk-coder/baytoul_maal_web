import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            registrations: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2">
                            <Link href="/admin/evenements">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour aux événements
                            </Link>
                        </Button>
                    </div>
                    <h1 className="text-3xl font-bold font-serif text-primary">Inscriptions</h1>
                    <p className="text-muted-foreground text-lg">
                        {event.title}
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* Placeholder for export functionality if needed later */}
                    {/* <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter CSV
                    </Button> */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Inscrits</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{event.registrations.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {event.capacity ? `${event.capacity - event.registrations.length} places restantes` : "Pas de limite"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des participants</CardTitle>
                </CardHeader>
                <CardContent>
                    {event.registrations.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            Aucune inscription pour le moment.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date d'inscription</TableHead>
                                    <TableHead>Nom complet</TableHead>
                                    <TableHead>Téléphone</TableHead>
                                    <TableHead>Adresse</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {event.registrations.map((reg: any) => (
                                    <TableRow key={reg.id}>
                                        <TableCell>
                                            {format(new Date(reg.createdAt), "d MMM yyyy HH:mm", { locale: fr })}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {reg.firstName} {reg.lastName}
                                        </TableCell>
                                        <TableCell>{reg.phone}</TableCell>
                                        <TableCell>{reg.address || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
