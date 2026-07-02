import { NextRequest, NextResponse } from "next/server";

import { getServiceCategory } from "@/app/lib/repositories/service.repository";

export async function GET() {
  try {
    // const body = await request.json();

    // const {} = body;

    const productCategory = await getServiceCategory();

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