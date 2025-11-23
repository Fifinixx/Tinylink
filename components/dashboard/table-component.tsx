"use client";

import { useState, useEffect } from "react";

import { Trash2, Copy, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";

type Link = {
  id: string;
  link: string;
  code: string;
  clickCount?: string;
  lastVisited?:string
  createdAt: string;
};

type TableComponentProps = {
  tableData: Link[];
  fetchData: () => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  search:string;
  pagination: { skip: number; totalPages: number };
};

export default function TableComponent({
  tableData,
  fetchData,
  deleteLink,
  search,
  pagination,
}: TableComponentProps) {
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  async function fetchTableData() {
    await fetchData();
    setLoading(false);
  }
  useEffect(() => {
    fetchTableData();
  }, [pagination.skip, search]);
  return (
    <>
      <div className="w-full sm:w-[75%] border rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">URL</TableHead>
              <TableHead className="text-center">CODE</TableHead>
              <TableHead className="text-center">CLICKS</TableHead>
              <TableHead className="text-center">LAST VISITED</TableHead>
              <TableHead className="text-center">COPY</TableHead>
              <TableHead className="text-center">STATS</TableHead>
              <TableHead className="text-right">DELETE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <div className="flex justify-center items-center py-4">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-[100px]">
                    <div className="min-w-0 truncate text-left">
                      {item.link}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{item.code}</TableCell>
                  <TableCell className="text-center">
                    {item.clickCount ?? 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lastVisited ? new Date(item.lastVisited).toLocaleString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-center ">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/${item.code}`
                        );
                        toast.success("Link copied");
                      }}
                    >
                      <Copy size={16} />
                    </button>
                  </TableCell>
                    <TableCell className=" text-center">
                      <Link  href={`/code/${item.code}`}>
                        <button className="cursor-pointer"><Eye size={16} /></button>
                      </Link>
                    </TableCell>
                  <TableCell className="text-right text-sm">
                    <button
                      className="cursor-pointer text-right"
                      onClick={async () => {
                        setDeleteLoading(item.id);
                        await deleteLink(item.code);
                        setDeleteLoading(null);
                      }}
                    >
                      {deleteLoading === item.id ? <Spinner /> : <Trash2 size={16} />}
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </>
  );
}
