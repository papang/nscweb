import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import http_headers from "@/app/lib/http_headers";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 , headers: http_headers}
    );
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 , headers: http_headers }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user,
  }, {
    status: 200,
    headers: http_headers,
  });
}



export async function POST(request: NextRequest) {

  // const validateUser = true; //await verifyBearerToken(request);

  // if (!validateUser) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Unauthorized: Invalid or missing token",
  //     },
  //     { status: 401, headers: http_headers }
  //   );
  // }


  const req = await request.json();
  const { 
    roleType
  } = req;

  const cookieStore = await cookies();

  try {

    let token: string | undefined;

    if(roleType==="ADMIN") {
      token = cookieStore.get("admin_token")?.value;
    } else if(roleType==="USER") {
      token = cookieStore.get("token")?.value;
    }

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: "invalid session" },
        { status: 401 , headers: http_headers}
      );
    }

    const tokenize = verifyToken(token);

    if (!tokenize) {
      return NextResponse.json(
        { authenticated: false, message: "invalid token verification" },
        { status: 401 , headers: http_headers }
      );
    }

    return NextResponse.json({
      authenticated: true, message: "",
      data: tokenize,
    }, {
      status: 200,
      headers: http_headers,
    });

    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        authenticated: false, 
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500, headers: http_headers }
    );

  }

}