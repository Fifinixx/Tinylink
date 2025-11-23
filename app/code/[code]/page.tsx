import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function CodeDetails({ params }: PageProps) {
  const { code } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${code}`
  );
  if (!res.ok) {
    notFound();
  }
  const stats = await res.json();
  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>STATS</CardTitle>
          <CardDescription>View your link stats</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 justify-center">
          <div className="flex justify-between border-b p-1">
            <p>ID</p>
            <p>{stats.code.id}</p>
          </div>
          <div className="flex justify-between border-b p-1">
            <p>ORIGINAL URL</p>
            <p>{stats.code.link}</p>
          </div>
          <div className="flex justify-between border-b p-1">
            <p>CODE</p>
            <p>{stats.code.code}</p>
          </div>
          <div className="flex justify-between border-b p-1">
            <p>CLICKS</p>
            <p>{stats.code.clickCount}</p>
          </div>
          <div className="flex justify-between border-b p-1">
            <p>LAST VISITED</p>
            <p>{new Date(stats.code.lastVisited).toLocaleString()}</p>
          </div>
          <div className="flex justify-between border-b p-1">
            <p>CREATED</p>
            <p>{new Date(stats.code.createdAt).toLocaleString()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link href="/" className="w-full">
            <Button className="w-full cursor-pointer">HOME</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
