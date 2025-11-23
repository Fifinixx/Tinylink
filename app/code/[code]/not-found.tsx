import Link from "next/link";

export default function CodeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">This code doesn't exist</h1>
      <p className="text-gray-600 mb-6">
        The link might have expired or been deleted.
      </p>
      <Link
        href="/"
        className="bg-neutral-600 text-white px-4 py-2 rounded hover:bg-neutral-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}