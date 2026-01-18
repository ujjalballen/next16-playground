"use server";

import { UserRole } from "@/generated/prisma/enums";
import { database } from "@/lib/db";
import { pollBatchResult, submitBatch } from "@/lib/judge0";
import { currentUser } from "@/lib/supabase/current-user";
import { id } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { success } from "zod";

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

// we send all argument data in one object, instead of one and one
export async function executeCode({ source_code, language_id, stdin, expected_output, problemId }) {
    try {
        const user = await currentUser();
        const dbUser = await database.profile.findUnique({
            where: {
                supabaseUserId: user.id
            }
        });

        if (
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_output) ||
            expected_output.length !== stdin.length) {
            return { success: false, error: "Invalid test cases" }
        };

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            base64_encoded: false,
            wait: false
        }));

        const submitResponse = await submitBatch(submissions);

        const tokens = submitResponse.map((res) => res.tokens);

        const results = await pollBatchResult(tokens);

        let allPassed = true;

        const detailedResults = results.map((result, i) => {
            const stdout = result.stdout?.trim() || null;
            const expected_output = expected_output[i]?.trim()

            const passed = stdout === expected_output;

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stdeer: result.stdeer || null,
                complile_output: result.complile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined

            }
        });

        const submisstion = await database.submission.create({
            data: {
                userId: dbUser.id,
                problemId: id,
                source_code: source_code,
                lanauge: getLanguageName(language_id),
                stdin: stdin.join("/n"),
                stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                stderr: detailedResults.some((r) => r.stdeer) ?
                    JSON.stringify(detailedResults.map((r) => r.stderr)) :
                    null,
                complileOutput: detailedResults.some((r) => r.complile_output)
                    ? JSON.stringify(detailedResults.map((r) => r.complile_output)) :
                    null,
                status: allPassed ? "Accepted" : "Wrong Answer",
                memory: detailedResults.some((r) => r.memory)
                    ? JSON.stringify(detailedResults.map((r) => r.memory)) :
                    null,
                time: detailedResults.some((r) => r.time) ?
                    JSON.stringify(detailedResults.map((r) => r.time)) :
                    null
            }
        });

        if (allPassed) {
            await database.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId: dbUser.id,
                        problemId: id
                    }
                },
                update: {},
                create: {
                    userId: dbUser.id,
                    problemId: id
                }
            })
        };


        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submisstion.id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stdeer,
            comileOutput: result.complile_output,
            status: result.status,
            memory: result.memory,
            time: result.time
        }))

        await database.testCaseResult.createMany({
            data: { testCaseResults }
        });

        const submissionWithTestCases = await database.submission.findUnique({
            where: {
                id: submisstion.id
            },
            include: { testCase: true }
        });

        return { success: true, submisstion: submissionWithTestCases }

    } catch (error) {
        console.error("Error to ExecuteCode: ", error);
        return {
            success: false,
            error: error.message || "Faild to execute code"
        }
    }
}