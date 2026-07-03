/* /api/sku */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import jwt from "jsonwebtoken";

import { getSKUCurrentOrder, getSKUOrderSummaryByService } from "@/app/lib/repositories/service.repository";

export async function GET(request: NextRequest) {
  try {

    const qParams = request.nextUrl.searchParams;
    const session_id = qParams.get('sessionid') || "";

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    const userid = user?.userId;
    // console.log("usernya:" + user);

    const rec = await getSKUCurrentOrder(userid, session_id);
    const sum = await getSKUOrderSummaryByService(userid, session_id);

    let grandTotal = 0;
    for (const key in rec) {
      grandTotal = grandTotal + Number(rec[key].sales_price);
    }

    if (!rec) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty product",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        success: true, 
        message: "",
        data: rec,
        summary: {
          "byproduct" : sum,
          "all" : grandTotal
        }
      });

    return response;

  } catch (error) {

    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error"+error,
      },
      { status: 500,  }
    );

  }

}