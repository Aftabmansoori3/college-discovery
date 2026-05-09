import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";

  try {
    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { location: { contains: query } },
              { state: { contains: query } },
            ],
          },
          location ? { state: { contains: location } } : {},
          type ? { type: { equals: type } } : {},
        ],
      },
      include: { courses: true },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Failed to fetch colleges:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
