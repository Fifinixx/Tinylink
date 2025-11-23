"use client";

import { useState } from "react";

import { Spinner } from "@/components/ui/spinner"
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AddLinkProps = {
    link:string,
    setLink: React.Dispatch<React.SetStateAction<string>>;
    code:string,
    setCode: React.Dispatch<React.SetStateAction<string>>;
    addLink: () => Promise<void>
}

export default  function AddLink({link, setLink, code, setCode, addLink} : AddLinkProps) {
    const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full sm:w-[75%]  h-full justify-center gap-2 items-center relative">
      <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="sm:w-[75%] w-full  text-neutral-200"
          type="text"
          placeholder="LINK"
        />
              <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full sm:w-[30%]  text-neutral-200"
          type="text"
          placeholder="CODE"
        />
        <Button
        onClick={async () => {
            setLoading(true);
            await addLink();
            setLoading(false);
        }}
          variant="ghost"
          className="cursor-pointer  border w-full sm:w-[15%]"
        >
          {loading ? <Spinner /> : "SHORTEN"}
        </Button>
 
      </div>
    </>
  );
}
