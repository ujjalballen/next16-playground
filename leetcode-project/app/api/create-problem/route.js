import { UserRole } from "@/generated/prisma/enums";
import { database } from "@/lib/db";
import { getJudge0LanguageId, pollBatchResult, submitBatch } from "@/lib/judge0";
import { currentUser } from "@/lib/supabase/current-user";
import { currentUserRole, getCurrentUserFromTable } from "@/modules/auth/actions";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request) {
    try {

        const user = await getCurrentUserFromTable();
        const currentRole = await currentUserRole();

        if (!currentRole) {
            return NextResponse.json({ error: "User role not found" }, { status: 404 })
        }

        if (currentRole.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // get all the fields from the client side
        // basic validation
        // run a loop for each lang ---> number of test cases
        // get judge0 lang id for currentLang
        // prepare judge0 submission for all the testcases
        // submit all the testcases in one batch
        // extract tokens from responses


        const body = await request.json();

        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            // hints,
            // editorial,
            testCases,
            codeSnippets,
            referenceSolutions

        } = body;

        // Basic validation
        if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        };

        // Validation testcases
        if (!Array.isArray(testCases) || testCases.length === 0) {
            return NextResponse.json(
                { error: "At least one testcases is required" },
                { status: 400 }
            )
        };

        // validation refference solutions
        if (!referenceSolutions || typeof referenceSolutions !== "object") {
            return NextResponse.json(
                { error: "Reference solutions must be provided for all language" },
                { status: 400 }
            )
        };


        for (const [language, soclutionCode] of Object.entries(referenceSolutions)) {
            // get Judge0 Language ID for the current lang

            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return NextResponse.json(
                    { error: `Unsupported language ${language}` },
                    { status: 400 }
                )
            };


            // Prepare judge0 Submissions for all the testcase

            const submissions = testCases.map((input, output) => ({
                source_code: soclutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));


            // Submit all testcases in one Batch

            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((res) => res.token);

            const results = await pollBatchResult(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                if (result.status.id !== 3) {
                    return NextResponse.json(
                        {
                            error: `validattion faild for ${language}`,
                            restCase: {
                                input: submission[i].stdin,
                                expected_output: submissions[i].expected_output,
                                actualOutput: result.stdout,
                                error: result.stderr || result.compile_output
                            },
                            details: result,
                        },
                        { status: 400 }
                    )
                }
            }


        };


        // Step - 3: set the problem into the db

        const newProblem = await database.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testCases,
                codeSnippets,
                referenceSolutions,
                userId: user.id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Problem created successfully",
            data: newProblem
        }, { status: 201 })





    } catch (error) {
        console.error("Faild to create problem")
        return NextResponse.json({
            success: false,
            error: "Faild to create problem"
        }, { status: 500 })
    }
}