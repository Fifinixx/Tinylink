import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, {params}:{ params: Promise<{ code: string }>}) {
  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return NextResponse.json(
      { message: "Code not found" },
      { status: 404 }
    );
  }

  await prisma.link.update({
    where: { code },
    data: {
      clickCount: (Number(link.clickCount) || 0) + 1,
      lastVisited: new Date(),
    },
  });


  return NextResponse.redirect(link.link, 302);
}
