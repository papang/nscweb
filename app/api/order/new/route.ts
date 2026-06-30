import { NextRequest, NextResponse } from "next/server";
import { insertOrder } from "@/app/lib/repositories/product.repository";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import jwt from "jsonwebtoken";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const { sku_select, } = body;
    console.log("pilih sku: " + sku_select);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    const user2 = JSON.stringify(user);
    const userid = user?.userId;

    const order = await insertOrder(userid,sku_select);

    return NextResponse.json({
      success: true,
      user: body,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error: " + error,
      },
      {
        status: 500,
      }
    );
  }
}