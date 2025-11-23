import { EventForm } from "@/components/admin/evenements/event-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
    const { id } = await params;
    const event = await prisma.event.findUnique({
        where: { id },
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Modifier l'événement</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <EventForm event={event} />
            </div>
        </div>
    );
}
