import { NextResponse } from "next/server";


import { pool } from "@/app/lib/db";
import { registerUser } from "@/app/lib/repositories/user.repository";
import http_headers from "@/app/lib/http_headers";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      username, email, phoneNo, password, companyName, jobTitle, profession
    } = body;

    const user = await registerUser(username, email, phoneNo, password, companyName, jobTitle, profession);

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
        message:
          "Gagal membuat user",
      },
      {
        status: 500,
        headers: http_headers,
      }
    );
  }
}