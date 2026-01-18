import { database } from "@/lib/db";
import { currentUser } from "@/lib/supabase/current-user";
import { NextResponse } from "next/server";


// get all playlists by it's user
export async function GET(request) {
    try {

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        };

        const dbUser = await database.profile.findUnique({
            where: {
                supabaseUserId: user.id
            }
        });

        if (!dbUser) {
            return NextResponse.json({
                success: false,
                error: "User Not Found"
            }, { status: 401 })
        };

        const playlists = await database.playlist.findMany({
            where: {
                userId: dbUser.id
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({
            success: true,
            playlists
        })

    } catch (error) {
        console.error("Error to fetch the all Problems: ", error);
        return NextResponse.json({
            success: false,
            error: "Faild to get all problems"
        })
    }
}


// insert playlist data
export async function POST(request) {
    try {

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        };

        const dbUser = await database.profile.findUnique({
            where: {
                supabaseUserId: user.id
            }
        });

        if (!dbUser) {
            return NextResponse.json({
                success: false,
                error: "User Not Found"
            }, { status: 401 })
        };

        const { name, description, } = await request.json();

        if (!name) {
            return NextResponse.json({
                success: false,
                error: "Name is Required"
            }, { status: 400 })
        };

        const playlistData = await database.playlist.create({
            data: {
                name,
                description,
                userId: dbUser.id
            }
        });

        return NextResponse.json({
            success: true,
            playlistData
        });

    } catch (error) {
        console.error("Error creating playlist: ", error);
        return NextResponse.json({
            success: false,
            error: "Faild to create Playlist"
        })
    }
}