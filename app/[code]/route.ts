import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = await params;
  if (code === "favicon.ico") return new NextResponse(null, { status: 204 });

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return NextResponse.json({ message: "Code not found" }, { status: 400 });
  }

  await prisma.link.update({
    where: { code },
    data: {
      clickCount: (link.clickCount ?? 0) + 1,
      lastVisited: new Date()
    },
  });

  return NextResponse.redirect(link.link, 302);
}
