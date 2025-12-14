import { NextResponse } from "next/server";
import { users } from "../../users/route";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "All field are required!",
        },
        {
          status: 400,
        }
      );
    }

    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "User not Found",
        },
        { status: 404 }
      );
    }

    users[userIndex] = {
        id: id,
        name: name,
        email: email
    };

    return NextResponse.json({
        success: true,
        data: users[userIndex],
        message: "User Updated"
    })


  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to update the user",
      },
      { status: 500 }
    );
  }
}
