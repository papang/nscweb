import { NextResponse, NextRequest } from "next/server";
import {cookies} from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import http_headers from "@/app/lib/http_headers";

import {db} from "@/app/lib/db/db";
import {pGroupGal, tGallery } from "@/app/lib/db/schema";
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

  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  if((token || "") === "") {
    token = cookieStore.get("admin_token")?.value;
  }
  const tokenize = verifyToken(token || "");
  if(!tokenize) 
    return;

  const { ops } = await params;
  const req = await request.json();
  const { 
    galId, 
    groupId,
    groupName,
    galTitle,
    galType,
    srcUrl,
    thumbnailUrl,
    createdBy,
    updatedBy,
  } = req;

  try {

    let data: any;
    let message = "";
    let success = true;
    switch (ops) {
      case "list":
        data = await db.select({
            galId: tGallery.galId, 
            groupId: tGallery.groupId,
            groupName: pGroupGal.groupName,
            galTitle: tGallery.galTitle,
            galType: tGallery.galType,
            srcUrl: tGallery.srcUrl,
            thumbnailUrl: tGallery.thumbnailUrl,
            createdBy: tGallery.createdBy,
            createdAt: tGallery.createdAt,
            updatedBy: tGallery.updatedBy,
            updatedAt: tGallery.updatedAt,
          })
          .from(tGallery)
          .leftJoin(pGroupGal, eq(tGallery.groupId, pGroupGal.groupId))
          .orderBy(desc(tGallery.createdAt))
          ;
        break;

      case "ins":
        data = await db.insert(tGallery).values({
          groupId: groupId,
          galTitle: galTitle,
          galType: galType,
          srcUrl: srcUrl,
          thumbnailUrl: thumbnailUrl,
          createdBy: createdBy,
        }).returning();
        break;

      case "upd":
        data = await db.update(tGallery).set({
          groupId: groupId,
          galTitle: galTitle,
          galType: galType,
          srcUrl: srcUrl,
          thumbnailUrl: thumbnailUrl,
          updatedBy: updatedBy,
        }).where(eq(tGallery.galId, parseInt(galId, 10))).returning();
        break;

      case "del":
        data = await db.delete(tGallery)
          .where(eq(tGallery.galId, parseInt(galId, 10)))
          .returning({galId:tGallery.galId, galTitle:tGallery.galTitle});
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