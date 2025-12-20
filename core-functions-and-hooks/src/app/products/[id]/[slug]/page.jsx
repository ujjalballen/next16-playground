"use client";

import { useParams } from "next/navigation";

export default function ProductIdSlugPage() {
  const params = useParams();

  console.log("All Params:", params);

  return <div>
    <h1>Param ID: {params.id}</h1>
    <h1>Slug: {params.slug}</h1>
  </div>;
}
