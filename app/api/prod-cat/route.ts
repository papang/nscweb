import { NextRequest, NextResponse } from "next/server";

import { getProductCategory } from "@/app/lib/repositories/product.repository";

export async function GET() {
  try {
    // const body = await request.json();

    // const {} = body;

    const productCategory = await getProductCategory();

    if (!productCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty product category",
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
        data: productCategory,
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