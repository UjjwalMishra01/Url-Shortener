import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("Received request to shorten URL");
    const { url } = await request.json();

  const shortCode = nanoid(8);

  const shortenedUrl = await prisma.url.create({
    data: {
      originalUrl: url,
      shortCode,
    },
  });
  console.log("Shortened URL created:", shortenedUrl);
  return NextResponse.json({ shortCode: shortenedUrl.shortCode });
}
