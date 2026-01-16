import { UserRole } from "@/generated/prisma/enums";
import { currentUser } from "@/lib/supabase/current-user";
import { currentUserRole } from "@/modules/auth/actions";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        const user = await currentUser();
        const currentRole = await currentUserRole();

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


        for(const [language, soclutionCode] of Object.entries(referenceSolutions)){
            // get Judge0 Language ID for the current lang
        }


    } catch (error) {

    }
}