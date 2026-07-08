import { NextResponse } from "next/server";

import { pool } from "@/app/lib/db";
import { sendOrderToSales } from "@/app/lib/repositories/service.repository";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import http_headers from "@/app/lib/http_headers";

export async function POST(
  request: Request
) {
  try {
    // const body = await request.json();
    // const { userid, } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    const userid = user?.userId;

    const order = await sendOrderToSales(userid);

    return NextResponse.json({
      success: true,
      data: order,
    }, {
      status: 200,
      headers: http_headers,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order.",
      },
      {
        status: 500, 
        headers: http_headers,
      }
    );
  }
}