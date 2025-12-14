import { NextResponse } from "next/server";
import { users } from "../route";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const user = users.find((u) => u.id === parseInt(id));
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to fetch",
      },
      { status: 500 }
    );
  }
}
