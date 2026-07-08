import { NextResponse } from "next/server";


import { changePassword } from "@/app/lib/repositories/user.repository";
import http_headers from "@/app/lib/http_headers";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      email, password,
    } = body;

    const user = await changePassword(email, password);

    return NextResponse.json({
      success: true,
      user: user,
    }, {
      status: 200,
      headers: http_headers,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to change password",
      },
      {
        status: 500,
        headers: http_headers,
      }
    );
  }
}