import { NextResponse, NextRequest } from "next/server";
import {cookies} from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import http_headers from "@/app/lib/http_headers";

import {db} from "@/app/lib/db/db";
import {pGroupGal } from "@/app/lib/db/schema";
import {sql, eq, ne, desc, and, asc} from "drizzle-orm";

export async function POST(request: NextRequest, { params }: { params: Promise<{ ops: string }> }) {

  // const validateUser = true; //await verifyBearerToken(request);

  // if (!validateUser) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Unauthorized: Invalid or missing token",
  //     },
  //     { status: 401, headers: http_headers }
  //   );
  // }

  // const cookieStore = await cookies();
  // let token = cookieStore.get("token")?.value;
  // if((token || "") === "") {
  //   token = cookieStore.get("admin_token")?.value;
  // }
  // const tokenize = verifyToken(token || "");
  // if(!tokenize) 
  //   return;

  const { ops } = await params;
  const req = await request.json();
  const { 
    groupId, groupName, description, ordNum
  } = req;

  try {

    let data: any;
    let message = "";
    let success = true;
    switch (ops) {
      case "list":
        data = await db.select().from(pGroupGal).orderBy(asc(pGroupGal.ordNum));
        break;

      case "ins":
        data = await db.insert(pGroupGal).values({
          groupId: parseInt(groupId, 10),
          groupName: groupName,
          description: "",
          ordNum: ordNum
        }).returning();
        break;

      case "upd":
        data = await db.update(pGroupGal).set({
          groupName: groupName,
          ordNum: ordNum
        }).where(eq(pGroupGal.groupId, parseInt(groupId, 10))).returning();
        break;

      case "del":
        data = await db.delete(pGroupGal)
          .where(eq(pGroupGal.groupId, parseInt(groupId, 10)))
          .returning({groupId:pGroupGal.groupId});
        break;

      default:
        data = {};
        message = "Invalid logic or operation";
        success = false;
        break;
    }

    const response =
      NextResponse.json({
        success: success, 
        message: message,
        result: data,
        props: {}
      }, {
        status: 200, headers: http_headers
      });

    if(!response.ok) {
      console.error("Response not ok:", response.status, response.statusText);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch data",
        },
        {
          status: response.status, headers: http_headers,
        }
      );
    }

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500, headers: http_headers }
    );

  }

}