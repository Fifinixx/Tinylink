import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const { code } = await params;

  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link) {
      return NextResponse.json({ message: "Code not found" }, { status: 404 });
    }

    await prisma.link.update({
      where: { code },
      data: {
        clickCount: (Number(link.clickCount) || 0) + 1,
        lastVisited: new Date(),
      },
    });

    return NextResponse.json({ url: link.link }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to resolve redirect" }, { status: 500 });
  }
}
