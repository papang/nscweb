import { cookies } from "next/headers";
import { NextResponse } from "next/server";
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