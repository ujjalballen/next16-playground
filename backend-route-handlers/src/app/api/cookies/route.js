import { cookies } from "next/headers";

export async function GET(request) {
  try {


    const cookieStore = await cookies();

    // cookieStore.set("name", "barray", {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax",
    //     path: "/"
    // })

    // cookieStore.delete("name")

    // const name = cookieStore.get("name");

    // console.log("Cookies Name: ", name)



    return Response.json(
      {
        success: true,
        message: "Cookies return successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Faild to fetch",
      },
      {
        status: 500,
      }
    );
  }
}
