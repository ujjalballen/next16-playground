import { Suspense } from "react";

// export async function generateStaticParams() {
//   return [{ slug: 'hello-world' }]
// }

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // fetch data base on the params for title and des
  // we can pass the data using encodeURIComponent
  const post = getData(slug);

  return {
    title: `Blog ${slug}`,
    description: "This is a dynamic post des",
    openGraph: {
      images: [
        `http://localhost:3000/api/og?title=${encodeURIComponent(
          post.title
        )}&description=${encodeURIComponent(post.description)}`,
      ],
    },
  };
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;

  return <div>Blog for this Page: {slug}</div>;
}
