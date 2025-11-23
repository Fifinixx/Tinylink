import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ code: string }>;
};
export default async function CodePage({ params }: Props) {
  const { code } = await params;
  console.log(code)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/${code}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <>Invalid code</>;
  }

  const data = await res.json();

  redirect(data.url);
}

