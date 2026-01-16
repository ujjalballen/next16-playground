import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserRole } from "@/generated/prisma/enums";
import { currentUser } from "@/lib/supabase/current-user"
import { currentUserRole } from "@/modules/auth/actions";
import { CreateProblemForm } from "@/modules/problems/components/create-problem-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateProblemPage() {

    // server side supabase-server
    const user = await currentUser();

    const userRole = await currentUserRole();

    if (userRole.role !== UserRole.ADMIN) {
        return redirect("/")
    }

    return (
        <div className='flex flex-col items-center justify-center  mx-4 my-4'>
        <div className='flex flex-row justify-between items-center w-full'>
            <Link href={"/"}>
            <Button variant={"outline"} size={"icon"}>
                <ArrowLeft className='size-4' />
            </Button>
            </Link>

             <h1 className='text-3xl font-bold text-amber-400'>Welcome {user?.user_metadata?.name}! Create a Problem</h1>
        <ModeToggle/>
        </div>
       <CreateProblemForm/>
    </div>
    )
}