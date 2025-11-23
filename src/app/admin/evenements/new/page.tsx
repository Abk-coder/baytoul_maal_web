import { EventForm } from "@/components/admin/evenements/event-form";

export default function NewEventPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Nouvel événement</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <EventForm />
            </div>
        </div>
    );
}
