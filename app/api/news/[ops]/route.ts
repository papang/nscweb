import { NextRequest, NextResponse } from "next/server";
import http_headers from "@/app/lib/http_headers";

import {db} from "@/app/lib/db/db";
import {pNewsCat, tNews } from "@/app/lib/db/schema";
import {eq} from "drizzle-orm";

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

  const { ops } = await params;
  const req = await request.json();
  const { newsId, newsCatId, newsTitle, imgUrl, authorBy, newsContent, createdBy } = req;
  // let newsId, newsCatId, newsTitle, imgUrl, authorBy, newsContent, createdBy: string;

  try {

    let data: any;
    let message = "";
    let success = true;
    switch (ops) {
      case "cat":
        data = await db.select().from(pNewsCat);
        break;  

      case "list":
        data = await db.select().from(tNews).where(eq(tNews.isPublished, 1));
        break;

      case "ins":
        data = await db.insert(tNews).values({
          newsCatId: parseInt(newsCatId, 10),
          newsTitle: newsTitle,
          imgUrl: imgUrl,
          authorBy: authorBy,
          newsContent: newsContent,
          createdBy: createdBy
        }).returning();
        break;

      case "upd":
        data = await db.update(tNews).set({
          newsCatId: parseInt(newsCatId, 10),
          newsTitle: newsTitle,
          imgUrl: imgUrl,
          authorBy: authorBy,
          newsContent: newsContent,
          createdBy: createdBy
        }).where(eq(tNews.newsId, parseInt(newsId, 10))).returning();
        break;

      case "del":
        data = await db.delete(tNews).where(eq(tNews.newsId, parseInt(newsId, 10))).returning();
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