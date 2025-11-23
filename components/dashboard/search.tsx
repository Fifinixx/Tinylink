"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchComponent({ search, setSearch }: SearchProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(localSearch);    
    }, 300);

    return () => clearTimeout(timeout); 
  }, [localSearch, setSearch]);

  return (
    <div className="w-full sm:w-[75%]">
      <Input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="SEARCH..."
      />
    </div>
  );
}
