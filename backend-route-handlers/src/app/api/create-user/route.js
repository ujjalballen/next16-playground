import { NextResponse } from "next/server";
import { users } from "../hello/route";

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Data fileds are required",
        },
        { status: 400 }
      );
    }

    const emailExsit = users.find((user) => user.email === email);
    if (emailExsit) {
      return NextResponse.json(
        {
          success: false,
          error: "User Already Exsit",
        },
        {
          status: 409, // 422  or 200 OK status
        }
      );
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        success: true,
        users: users,
        message: "User Created",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Faild to create a user",
      },
      { status: 500 }
    );
  }
}
