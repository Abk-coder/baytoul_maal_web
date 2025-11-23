import { MemberForm } from "@/components/admin/association/member-form";

export default function NewMemberPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Ajouter un membre</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <MemberForm />
            </div>
        </div>
    );
}
