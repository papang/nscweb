import { NextRequest, NextResponse } from "next/server";
import http_headers from "@/app/lib/http_headers";

import {db} from "@/app/lib/db/db";
import {tCompanyUsers  } from "@/app/lib/db/schema";
import {sql, eq, ne, desc, and} from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "@/app/lib/auth";

export async function POST(request: NextRequest) {

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

  const req = await request.json();
  const { 
    userId, roleId, userName, passwd
  } = req;

  try {

    let data: any;
    let resdata: any = {};
    let message = "";
    let success = true;

    data = await db.select({
      userId: tCompanyUsers.userId,
      userName: tCompanyUsers.userName,
      roleId: tCompanyUsers.roleId,
      hashPasswd: tCompanyUsers.hashPasswd,
    }).from(tCompanyUsers)
      .where( eq(tCompanyUsers.userId, userId) )
    ;

    if (data.length > 0) {

        // const hashnya = await bcrypt.hash(passwd + (process.env.SALT_KEY || "") , 10);
        // console.log(hashnya);
        const validPassword = await bcrypt.compare(passwd + (process.env.SALT_KEY || "") , data[0].hashPasswd);
        // console.log(validPassword);
        if (!validPassword) {
          success = false;
          message = "Wrong password";
        } else {
          resdata = {
            userId: data[0].userId, userName: data[0].userName, roleId: data[0].roleId,
          }

        }
    } else {
        success = false;
        message = "Unknown user";
    } 

    const response =
      NextResponse.json({
        success: success, 
        message: message,
        result: resdata,
      }, {
        status: 200, headers: http_headers
      });

    if(success) {
      // Generate Token if login success
      const token = generateToken(resdata);

      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 3,
      });
    }

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