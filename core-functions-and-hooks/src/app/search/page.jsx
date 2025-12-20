"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  const allQuery = Array.from(searchParams.entries())

  console.log(allQuery)

  console.log("Search Params: ", query, category, page);

  return (
    <div>
      Search Page
      <p>Query: {query}</p>
      <p>category: {category}</p>
      <p>Page: {page}</p>
    </div>
  );
}
