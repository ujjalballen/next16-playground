import { NextResponse } from "next/server";

let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: " Graham",
    username: "two",
    email: "two@april.biz",
  },
  {
    id: 3,
    name: "three",
    username: "th",
    email: "threee@april.biz",
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      datas: users,
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
