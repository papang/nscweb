/* /api/sku */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getServiceLine } from "@/app/lib/repositories/service.repository";

export async function GET(request: Request) {
  try {

    const rec = await getServiceLine();

    if (!rec) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty service line",
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
      });

    return response;

  } catch (error) {

    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500,  }
    );

  }

}