import { NextResponse } from "next/server";

export async function GET(request) {
    const currentTime = new Date();

    return NextResponse.json({
        timestamp: currentTime.toISOString(),
        readable: currentTime.toLocaleTimeString(),
        unix: currentTime.getTime(),
        message: "timer API called successfully!",
        requestid: Math.random().toString(36).substring(2, 15)
    })
}