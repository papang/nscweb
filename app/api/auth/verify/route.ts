import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { verifyUser } from "@/app/lib/repositories/user.repository";
import { redirect } from "next/navigation";
import http_headers from "@/app/lib/http_headers";

export async function GET( request: NextRequest ) {

    const searchParams = request.nextUrl.searchParams;
    const salt = process.env.SALT_KEY;
    const email = searchParams?.get("u");
    const unmask = salt + email!;
    const hash = searchParams?.get("h");

    const valid = await bcrypt.compare( unmask, hash! );

    if (valid) {
      const verify = await verifyUser(email!);
      redirect("/login");
      return NextResponse.json({
          success: true,
          message: "Verifikasi berhasil",
        }, {
          status: 200,
          headers: http_headers,
        }
      );

    } 

      return NextResponse.json({
          success: false,
          message: "Verifikasi user Anda gagal.",
        },
        { status: 401, headers: http_headers }
      );

}