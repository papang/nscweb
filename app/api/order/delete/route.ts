import { NextRequest, NextResponse } from "next/server";

import { deleteActiveOrder } from "@/app/lib/repositories/service.repository";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";

export async function POST(
  request: NextRequest
) {
  try {
    

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    const userid = user?.userId;

    const body = await request.json();
    const { sku_id } = body;

    const order = await deleteActiveOrder(userid, sku_id, "0");

    return NextResponse.json({
      success: true, 
      data: order,
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
      }
    );
  }
}