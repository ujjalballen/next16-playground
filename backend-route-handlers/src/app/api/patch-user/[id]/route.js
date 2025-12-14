import { NextResponse } from "next/server";
import { users } from "../../users/route";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    // if (!body) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "All field are required!",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

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
      ...users[userIndex],
      ...body,
    };

    return NextResponse.json(
      {
        success: true,
        data: users[userIndex],
        datas: users,
        message: "User Updated",
      },
      { status: 200 }
    );
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
