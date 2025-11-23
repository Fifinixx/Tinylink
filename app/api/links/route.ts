import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import validator from "validator";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get("skip") ?? 0);
    const take = Number(searchParams.get("take") ?? 5);
    const search = searchParams.get("search") ?? "";

    const where: Prisma.LinkWhereInput = search
    ? {
        OR: [
          {
            code: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            link: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

    const [data, count] = await Promise.all([
      prisma.link.findMany({
        skip: Number(skip),
        take: Number(take),
        where:where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.link.count({where}),
    ]);
    return NextResponse.json({ links: data, totalPages: Math.ceil(count / 5) });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch Links" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { link, code } = await req.json();
    if (code) {
      // if user has provided his own code
      const codeRegex = /^[A-Za-z0-9]{6,8}$/;
      if (!codeRegex.test(code))
        return NextResponse.json(
          {
            message:
              "\nInvalid code provided!\n Alphabets(A-Z, a-z), \n numbers,\n min length(6),\n max length(8)",
          },
          { status: 400 }
        );
    }

    const existingCode = await prisma.link.findUnique({
      where: { code },
    });
    if (existingCode) {
      return NextResponse.json(
        { message: "Code already exists" },
        { status: 409 }
      );
    }
    if (!link || typeof link !== "string") {
      return NextResponse.json(
        { message: "Please provide a valid Link" },
        { status: 400 }
      );
    }

    // cleanup link
    let formattedUrl = link.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    // validate url
    if (
      !validator.isURL(formattedUrl, {
        require_protocol: true,
        require_valid_protocol: true,
        allow_underscores: false,
        require_tld: true,
      })
    ) {
      return NextResponse.json(
        { message: "Invalid URL provided" },
        { status: 400 }
      );
    }

    await prisma.link.create({
      data: {
        link: formattedUrl,
        code:
          code.toLowerCase() ||
          customAlphabet(
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          )(8), // insert user provided code, or use nanoid to generate a 8 character string
      },
    });

    return NextResponse.json(
      {
        message: "Your link has been shortened",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Duplicate code error" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}
