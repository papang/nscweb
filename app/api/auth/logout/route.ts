import { NextResponse } from "next/server";
import http_headers from "@/app/lib/http_headers";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  }, {
    status: 200,
    headers: http_headers,
  });

  response.cookies.delete("token");

  return response;
}