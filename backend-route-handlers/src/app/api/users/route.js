import { NextResponse } from "next/server";

export const users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: " Graham",
    email: "two@april.biz",
  },
  {
    id: 3,
    name: "three",
    email: "threee@april.biz",
  },
];

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    // const age = searchParams.get("age")

    // console.log(name, age)

    let filterdUsers = users;

    if (name) {
      filterdUsers = users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      datas: filterdUsers,
      total: users.length,
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
