import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getAllProduct } from "@/app/lib/repositories/product.repository";
import http_headers from "@/app/lib/http_headers";

export async function GET(request: Request) {
  try {

    const rec = await getAllProduct();

    if (!rec) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty product",
        },
        {
          status: 401, 
          headers: http_headers
        }
      );
    }

    const response =
      NextResponse.json({
        success: true, 
        message: "",
        data: rec,
      }, {
        status: 200,
        headers: http_headers
      });

    return response;

  } catch (error) {

    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500, headers: http_headers }
    );

  }

}