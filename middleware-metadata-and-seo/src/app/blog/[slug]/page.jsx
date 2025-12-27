import { Suspense } from "react";

// export async function generateStaticParams() {
//   return [{ slug: 'hello-world' }]
// }

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `Blog ${slug}`
  }
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;

  return <div>Blog for this Page: {slug}</div>;
}
