import { NextResponse } from "next/server";


import { changePassword } from "@/app/lib/repositories/user.repository";

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
      }
    );
  }
}