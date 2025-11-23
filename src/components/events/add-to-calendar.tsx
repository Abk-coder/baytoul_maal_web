"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AddToCalendarProps {
    event: {
        title: string;
        description: string;
        location: string;
        startDate: Date;
        endDate?: Date | null;
    };
}

export function AddToCalendarButton({ event }: AddToCalendarProps) {
    const handleAddToCalendar = () => {
        const formatDate = (date: Date) => {
            return date.toISOString().replace(/-|:|\.\d+/g, "");
        };

        const start = formatDate(new Date(event.startDate));
        const end = event.endDate
            ? formatDate(new Date(event.endDate))
            : formatDate(new Date(new Date(event.startDate).getTime() + 3 * 60 * 60 * 1000)); // Default 3 hours

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={handleAddToCalendar}
        >
            <Download className="mr-2 h-4 w-4" />
            Ajouter au calendrier
        </Button>
    );
}
