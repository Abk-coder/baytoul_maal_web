import { MemberForm } from "@/components/admin/association/member-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: PageProps) {
    const { id } = await params;
    const member = await prisma.associationMember.findUnique({
        where: { id },
    });

    if (!member) {
        notFound();
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Modifier le membre</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <MemberForm member={member} />
            </div>
        </div>
    );
}
