import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

export async function OrgChart() {
    const members = await prisma.associationMember.findMany({
        orderBy: {
            order: "asc",
        },
    });

    if (members.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-muted-foreground">Aucun membre à afficher pour le moment.</p>
            </div>
        );
    }

    // Group members by hierarchy based on their role
    const amir = members.find((m: any) => m.role.toLowerCase().includes("amir"));
    const sg = members.find((m: any) => m.role.toLowerCase().includes("secrétaire") || m.role.toLowerCase().includes("secretaire"));
    const commissions = members.filter((m: any) =>
        m.commission &&
        m.id !== amir?.id &&
        m.id !== sg?.id
    );
    const others = members.filter((m: any) =>
        !m.commission &&
        m.id !== amir?.id &&
        m.id !== sg?.id
    );

    return (
        <div className="flex flex-col items-center gap-12 py-12">
            {/* Level 1: Amir */}
            {amir && <MemberCard member={amir} size="lg" />}

            {amir && sg && <div className="h-12 w-px bg-border -my-6" />}

            {/* Level 2: SG */}
            {sg && <MemberCard member={sg} size="md" />}

            {sg && commissions.length > 0 && <div className="h-12 w-px bg-border -my-6" />}

            {/* Level 3: Commissions */}
            {commissions.length > 0 && (
                <>
                    <div className="w-full max-w-3xl h-px bg-border relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-px bg-border -mt-6" />
                        {commissions.map((_: any, idx: any) => (
                            <div
                                key={idx}
                                className="absolute top-0 h-6 w-px bg-border"
                                style={{ left: `${(idx + 1) * (100 / (commissions.length + 1))}%` }}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 pt-6">
                        {commissions.map((member: any) => (
                            <div key={member.id} className="flex justify-center relative">
                                <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-px bg-border" />
                                <MemberCard member={member} size="sm" />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Other members */}
            {others.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4 mt-8">
                    {others.map((member: any) => (
                        <MemberCard key={member.id} member={member} size="sm" />
                    ))}
                </div>
            )}
        </div>
    );
}

function MemberCard({ member, size = "md" }: { member: any, size?: "sm" | "md" | "lg" }) {
    const isLarge = size === "lg";
    const isSmall = size === "sm";

    return (
        <Card className={`text-center overflow-hidden border-2 ${isLarge ? 'border-primary shadow-xl w-full max-w-md' : 'border-muted w-full max-w-sm'} transition-all hover:scale-105`}>
            <CardHeader className="flex flex-col items-center pb-2">
                <Avatar className={`${isLarge ? 'h-32 w-32' : 'h-24 w-24'} border-4 border-background shadow-sm mb-4`}>
                    <AvatarImage src={member.photoUrl || ""} alt={member.name} className="object-cover" />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className={`font-bold font-serif ${isLarge ? 'text-2xl' : 'text-xl'}`}>{member.name}</h3>
                <Badge variant={isLarge ? "default" : "secondary"} className="mt-2">
                    {member.role}
                </Badge>
                {member.commission && (
                    <Badge variant="outline" className="mt-1 text-xs">
                        {member.commission}
                    </Badge>
                )}
            </CardHeader>
            {member.bio && (
                <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
            )}
        </Card>
    );
}
