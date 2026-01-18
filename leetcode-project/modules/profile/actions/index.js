"use server";

import { database } from "@/lib/db";
import { currentUser } from "@/lib/supabase/current-user";

export async function getCurrentUserData() {
    try {
        const user = await currentUser();
        const data = await database.profile.findUnique({
            where: {
                supabaseUserId: user.id
            },
            include: {
                submissions: true,
                solvedProblems: true,
                playlists: true
            }
        });

        return { suuccess: true, data };
    } catch (error) {
        console.error("Error fetching the user: ", error);
        return {
            success: false,
            error: "faild to fetch user"
        }
    }
}