export const metadata = {
  title: "About Page - SEO and Metadata",
  description: "This is a About page",

  // for specific page
  openGraph: {
    title: "About - Next.js Course",
    description: "Learning about OG Img",
    url: "http://localhost:3000/about",
    siteName: "Next.js Learning",
    images: [
      {
        url: "/latte-art.png",
        width: 800,
        height: 600,
        alt: "latte-art",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function AboutPage() {
  return <div>This is a About PAGE!!!!!</div>;
}
