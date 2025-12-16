import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Access the request headers
    // const requestHeaders = new Headers(request.headers);
    // const requestHeaders = request.headers;
    const requestHeaders = await headers();

    const authHeader = requestHeaders.get("Authorization");
    const helloHeader = requestHeaders.get("Hello");

    console.log("Auth header: ", authHeader)
    console.log("Hello header: ", helloHeader)

    return Response.json({
      success: true,
      message: "Hello World form the Server Profile",
    }, {
      status: 201,
      headers: {
        "name": "Barry",
       
      }
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Faild to fetch",
      },
      { status: 500 }
    );
  }
}

/* 

In Server Components: Use await headers().
In Route Handlers: Use request.headers (or await headers(), whichever you prefer).
To Modify Headers: Use new Headers() to create a mutable copy

*/
