import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { NextResponse } from "next/server";

  
  export async function DELETE(req: Request, {params}:{params:{code:string}}) {
    try {
      const { code } = await params;
      if (!code) {
        return NextResponse.json(
          { message: "Please provide a code" },
          { status: 400 }
        );
      }
      const deletedLink = await prisma.link.delete({
        where: { code },
      });
      return NextResponse.json(
        { message: "Link deleted succesfully" , deletedLink},
        { status: 200 }
      );
    } catch (e) {
        console.error(e)
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
          return NextResponse.json(
            { message: "Provided ID cannot be found" },
            { status: 404 }
          )
        }
      return NextResponse.json({message:"Failed to delete link"}, {status:500})
    }
  }


  export async function GET(req: Request, {params}:{params:{code:string}}) {
    const { code } = await params;
    try {
      const stats = await prisma.link.findUnique({
        where:{code}
      });
      if(!stats){
        return NextResponse.json({message:"Code not found"}, {status:404});
      }
      return NextResponse.json({ code: stats });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return NextResponse.json(
          { message: "Provided ID cannot be found" },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { message: "Failed to fetch stats" },
        { status: 500 }
      );
    }
  }
  
