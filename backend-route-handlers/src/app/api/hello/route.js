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
