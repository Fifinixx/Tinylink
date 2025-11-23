"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import AddLink from "@/components/dashboard/add-link";
import TableComponent from "@/components/dashboard/table-component";
import { PaginationComponent } from "@/components/dashboard/pagination-component";
import SearchComponent from "@/components/dashboard/search";

export default function Home() {
  type table = {
    id: string;
    link: string;
    code: string;
    clickCount?: string;
    lastVisited?: string;
    createdAt: string;
  };
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const [tableData, setTableData] = useState<table[]>([]);
  const [pagination, setPagination] = useState({ skip: 0, totalPages: 0 });
  const [search, setSearch] = useState("");
  async function addLink() {
    if (!link) {
      toast.error("Link cannot be blank");
      return;
    }
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: link, code: code }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(`Error[${res.status}]: ${data.message} `);
      } else {
        toast.success("Shortened url successfully!");
        fetchData();
        setLink("");
      }
    } catch (e) {
      console.error("POST error", e);
      const message =
        e instanceof Error
          ? e.message
          : "Something went wrong while adding the link";
      toast.error(message);
    }
  }

  async function deleteLink(code: string) {
    try {
      const res = await fetch(`/api/links/${code}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ code: code }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(`Error[${res.status}]: ${data.message} `);
      } else {
        toast.success("Deleted link successfully!");
        fetchData();
      }
    } catch (e) {
      console.error("DELETE error", e);
      const message =
        e instanceof Error
          ? e.message
          : "Something went wrong while deleting the link";
      toast.error(message);
    }
  }

  async function fetchData() {
    try {
      const res = await fetch(
        `/api/links?skip=${pagination.skip}&take=5&search=${search}`
      );
      if (!res.ok) {
        const data = await res.json();
        toast.error(`Error[${res.status}]: ${data.message} `);
      }
      const data = await res.json();
      setTableData(data.links);
      setPagination((prev) => ({ ...prev, totalPages: data.totalPages }));
    } catch (e) {
      console.error("FETCH error", e);
      const message = e instanceof Error ? e.message : "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <>
      <AddLink
        link={link}
        setLink={setLink}
        code={code}
        setCode={setCode}
        addLink={addLink}
      />
      <SearchComponent search={search} setSearch={setSearch} />
      <TableComponent
        tableData={tableData}
        fetchData={fetchData}
        deleteLink={deleteLink}
        pagination={pagination}
        search={search}
      />
      <PaginationComponent
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}
