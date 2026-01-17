"use server";

import { UserRole } from "@/generated/prisma/enums";
import { database } from "@/lib/db";
import { currentUser } from "@/lib/supabase/current-user";
import { revalidatePath } from "next/cache";

export async function getAllProbles() {
    try {
        const user = await currentUser();
        const data = await database.profile.findUnique({
            where: {
                supabaseUserId: user.id
            },
            select: {
                id: true
            }
        });

        const problems = await database.problem.findMany({
            include: {
                solvedBy: {
                    where: {
                        userId: data.id
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return { success: true, data: problems }

    } catch (error) {
        console.error("Faild to fetch problems: ", error);
        return { success: false, error: "Faild to fetch problems" }
    }
}


export async function getProblemById(id) {
    try {
        const problem = await database.problem.findUnique({
            where: {
                id: id
            }
        });

        return { success: true, data: problem }

    } catch (error) {
        console.error("Error fetching problem: ", error);
        return { success: false, error: "Faild to fetch problem" }
    }
}


export async function deleteProblem(problemId) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("Unauthorized")
        };

        const dbUser = await database.profile.findUnique({
            where: {
                supabaseUserId: user?.id
            },
            select: {
                role: true
            }
        });

        if (dbUser?.role !== UserRole.ADMIN) {
            throw new Error("Only admin can delete problems")
        }

        await database.problem.delete({
            where: {
                id: problemId
            }
        });

        revalidatePath("/problems");

        return { success: true, message: "Problem delete successfully" }

    } catch (error) {
        console.error("Error deleting problem: ", error);
        return { success: false, error: "Faild to delete problem" }
    }
}