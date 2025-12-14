import { NextResponse } from "next/server";
import { users } from "../../users/route";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (!userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const deleteUser = users[userIndex];
    users.splice(userIndex, 1);

    return NextResponse.json(
      {
        success: true,
        data: deleteUser,
        message: "delete the user"
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to delete the user",
      },
      { status: 500 }
    );
  }
}
