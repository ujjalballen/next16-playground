import { database } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
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

        const { playlistId, problemId } = await request.json();

        if (!playlistId || !problemId) {
            return NextResponse.json({
                success: false,
                error: "playlistId and problemId are required"
            }, { status: 400 })
        };

        // verfify the playlist, does it exsit or not
        const playlist = await database.playlist.findFirst({
            where: {
                id: playlistId,
                userId: dbUser.id
            }
        });

        if (!playlist) {
            return NextResponse.json({
                success: false,
                error: "Playlist not found or unauthorized"
            }, { status: 404 })
        };

        const problemInPlaylist = await database.problemInPlaylist.create({
            data: {
                playlistId,
                problemId
            }
        });


        return NextResponse.json({
            success: true,
            data: problemInPlaylist
        })


    } catch (error) {
        console.error("Error adding problem in playlist: ", error);
        return NextResponse.json({
            success: false,
            error: "Faild to add problem in playlist"
        })
    }
}