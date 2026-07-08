import { NextRequest, NextResponse } from "next/server";
import { insertNewOrder } from "@/app/lib/repositories/service.repository";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import jwt from "jsonwebtoken";
import http_headers from "@/app/lib/http_headers";


// export async function POST(
//   request: NextRequest
// ) {
//   try {
//     const body = await request.json();

//     const { sku_select, } = body;
//     console.log("pilih sku: " + sku_select);

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value || "";
//     const user = verifyToken(token);
//     const user2 = JSON.stringify(user);
//     const userid = user?.userId;

//     const order = await insertOrder(userid,sku_select);

//     return NextResponse.json({
//       success: true,
//       user: body,
//     });

//   } catch (error) {

//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error: " + error,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { sku_mrc, sku_otc } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const user = verifyToken(token);
    const user2 = JSON.stringify(user);
    const userid = user?.userId;

    const order_mrc = await insertNewOrder(userid, "0", sku_mrc[0].sku_id, sku_mrc[0].sku_id, 
      sku_mrc[0].service_code, sku_mrc[0].service_name, sku_mrc[0].sales_price);
    const order_otc = await insertNewOrder(userid, "0", sku_otc[0].sku_id, sku_mrc[0].sku_id, 
      sku_otc[0].service_code, sku_otc[0].service_name, sku_otc[0].sales_price);

    return NextResponse.json({
      success: true,
      message: sku_mrc,
    }, {
      status: 200,
      headers: http_headers,
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
        headers: http_headers,
      }
    );
  }
}