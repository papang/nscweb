import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { generateToken } from "@/app/lib/auth";
import { findValidUser } from "@/app/lib/repositories/user.repository";
import http_headers from "@/app/lib/http_headers";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      username,
      password,
    } = body;

    const user = await findValidUser( username );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Username tidak ditemukan",
        },
        {
          status: 401,
          headers: http_headers,
        }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    // const hash =
    // await bcrypt.hash(
    //   password,
    //   10
    // );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password Anda salah",
        },
        {
          status: 401,
          headers: http_headers,
        }
      );
    }

    const token =
      generateToken({
        userId: user.id,
        username: user.username,
      });

    const response =
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      }, {
        status: 200,
        headers: http_headers,
      });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "strict",
      path: "/",
      maxAge:
        60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
        headers: http_headers,
      }
    );
  }
}