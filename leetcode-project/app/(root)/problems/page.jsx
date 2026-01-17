import { database } from "@/lib/db";
import { currentUser } from "@/lib/supabase/current-user"
import { getAllProbles } from "@/modules/problems/actions";
import { ProblemsTable } from "@/modules/problems/components/problems-table";

export default async function ProblemsPage() {

    const user = await currentUser();

    let dbUser = null;

    if (user) {
        dbUser = await database.profile.findUnique({
            where: {
                supabaseUserId: user?.id
            },
            select: {
                id: true,
                role: true
            }
        });
    };


    const { data: problems, error } = await getAllProbles()
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-destructive">Error loading problems: {error}</p>
            </div>
        );
    }

    return (
         <div className='container mx-auto py-32'>
        <ProblemsTable problems={problems} user={dbUser} />
    </div>
    )
}