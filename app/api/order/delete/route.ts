import { NextRequest, NextResponse } from "next/server";

import { sendOrderToSales, deleteActiveOrder } from "@/app/lib/repositories/product.repository";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";

export async function POST(
  request: NextRequest
) {
  try {
    

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    // const userid = user?.userId;

    const body = await request.json();
    const { delskuid, userid } = body;

    const order = await deleteActiveOrder(userid, delskuid);

    return NextResponse.json({
      success: true
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