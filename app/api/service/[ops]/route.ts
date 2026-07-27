import { NextResponse, NextRequest } from "next/server";
import {cookies} from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import http_headers from "@/app/lib/http_headers";

import {db} from "@/app/lib/db/db";
import {pServiceCategory } from "@/app/lib/db/schema";
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
    serviceId
  } = req;

  try {

    let data: any;
    let message = "";
    let success = true;
    switch (ops) {
      case "cat":
        data = await db.select().from(pServiceCategory).orderBy(asc(pServiceCategory.ordNum));
        break;
      case "cat-ins":
        data = await db.select().from(pServiceCategory);
        break;

      case "list":
        // data = await db.select({
        //   newsId: tNews.newsId,
        //   newsCatId: tNews.newsCatId, 
        //   newsTitle: tNews.newsTitle,
        //   newsCatName: pNewsCat.newsCatName,
        //   imgUrl: tNews.imgUrl,
        //   authorBy: tNews.authorBy,
        //   newsContent: tNews.newsContent,
        //   isPublished: tNews.isPublished,
        //   createdBy: tNews.createdBy,
        //   createdAt: tNews.createdAt,
        //   updatedBy: tNews.updatedBy,
        //   updatedAt: tNews.updatedAt,
        //   statVisit: tNews.statVisit,
        //   tags: tNews.tags, 
        //   srcNews:tNews.srcNews, srcUrl: tNews.srcUrl,
        //   isHeadline: tNews.isHeadline,
        // }).from(tNews)
        //   .leftJoin(pNewsCat, eq(tNews.newsCatId, pNewsCat.newsCatId))
        //   .where(eq(tNews.srcInex, srcType))
        //   .orderBy(desc(tNews.createdAt));
        break;

      case "ins":
        // if(srcType=="IN") {
        //   data = await db.insert(tNews).values({
        //     srcInex: srcType,
        //     newsCatId: parseInt(newsCatId, 10),
        //     newsTitle: newsTitle,
        //     imgUrl: imgUrl,
        //     authorBy: authorBy,
        //     newsContent: newsContent,
        //     createdBy: createdBy, 
        //     isPublished: isPublished,
        //   }).returning();

        //   if(isHeadline===1) {
        //     setHeadline(parseInt(newsId, 10));
        //   }

        // } else if(srcType=="EX") {
        //   data = await db.insert(tNews).values({
        //     srcInex: srcType,
        //     newsTitle: newsTitle,
        //     imgUrl: imgUrl,
        //     authorBy: authorBy,
        //     newsContent: newsContent,
        //     createdBy: createdBy, 
        //     isPublished: isPublished,
        //     srcNews: srcNews,
        //     srcUrl: srcUrl,
        //   }).returning();
        // }
        
        break;

      case "upd":
        // if(srcType=="IN") {
        //   data = await db.update(tNews).set({
        //     newsCatId: parseInt(newsCatId, 10),
        //     newsTitle: newsTitle,
        //     imgUrl: imgUrl,
        //     authorBy: authorBy,
        //     newsContent: newsContent,
        //     updatedBy: updatedBy,
        //     updatedAt: sql`now()`,
        //     isPublished: isPublished
        //   }).where(eq(tNews.newsId, parseInt(newsId, 10))).returning();

        //   if(isHeadline===1) {
        //     setHeadline(parseInt(newsId, 10));
        //   }

        // } else if(srcType=="EX") {
        //   data = await db.update(tNews).set({
        //     newsTitle: newsTitle,
        //     imgUrl: imgUrl,
        //     authorBy: authorBy,
        //     newsContent: newsContent,
        //     updatedBy: updatedBy,
        //     updatedAt: sql`now()`,
        //     isPublished: isPublished,
        //     srcNews: srcNews,
        //     srcUrl: srcUrl,
        //   }).where(eq(tNews.newsId, parseInt(newsId, 10))).returning();
        // }
        break;

      case "del":
        // data = await db.delete(tNews).where(eq(tNews.newsId, parseInt(newsId, 10))).returning({newsId:tNews.newsId});
        break;

      case "insight":
        // data = await db.select({
        //   newsId: tNews.newsId,
        //   newsCatId: tNews.newsCatId, 
        //   newsTitle: tNews.newsTitle,
        //   newsCatName: pNewsCat.newsCatName,
        //   imgUrl: tNews.imgUrl,
        //   authorBy: tNews.authorBy,
        //   newsContent: tNews.newsContent,
        //   isPublished: tNews.isPublished,
        //   createdBy: tNews.createdBy,
        //   createdAt: tNews.createdAt,
        //   updatedBy: tNews.updatedBy,
        //   updatedAt: tNews.updatedAt,
        //   statVisit: tNews.statVisit,
        //   tags: tNews.tags, 
        //   isHeadline: tNews.isHeadline,
        // }).from(tNews)
        //   .leftJoin(pNewsCat, eq(tNews.newsCatId, pNewsCat.newsCatId))
        //   .where(and(eq(tNews.srcInex, "IN"), eq(tNews.isPublished, 1)) )
        //   .orderBy(desc(tNews.createdAt));
        break;

      case "feed":
        // data = await db.select({
        //   newsId: tNews.newsId,
        //   newsCatId: tNews.newsCatId, 
        //   newsTitle: tNews.newsTitle,
        //   newsCatName: pNewsCat.newsCatName,
        //   imgUrl: tNews.imgUrl,
        //   authorBy: tNews.authorBy,
        //   newsContent: tNews.newsContent,
        //   isPublished: tNews.isPublished,
        //   createdBy: tNews.createdBy,
        //   createdAt: tNews.createdAt,
        //   updatedBy: tNews.updatedBy,
        //   updatedAt: tNews.updatedAt,
        //   statVisit: tNews.statVisit,
        //   tags: tNews.tags, 
        //   srcNews:tNews.srcNews, srcUrl: tNews.srcUrl,
        // }).from(tNews)
        //   .leftJoin(pNewsCat, eq(tNews.newsCatId, pNewsCat.newsCatId))
        //   .where(and(eq(tNews.srcInex, "EX"), eq(tNews.isPublished, 1)) )
        //   .orderBy(desc(tNews.createdAt));
        break;

      case "read":
          // data = await db.update(tNews).set({
          //   statVisit: sql`${tNews.statVisit} + 1`
          // }).where(eq(tNews.newsId, parseInt(newsId, 10))).returning({newsId: tNews.newsId, statVisit: tNews.statVisit});
          break;

      case "setheadline":
          // await db.update(tNews).set({
          //   isHeadline: 0
          // }).where(and(ne(tNews.newsId, parseInt(newsId, 10)), eq(tNews.srcInex, "IN") ));
          // data = await db.update(tNews).set({
          //   isHeadline: 1
          // }).where(eq(tNews.newsId, parseInt(newsId, 10))).returning({newsId: tNews.newsId, newsTitle: tNews.newsTitle});
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