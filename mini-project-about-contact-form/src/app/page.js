import ContactForm from "@/components/contact-form";

export default async function Home() {
  return (
    <main className="max-h-screen py-12 px-">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Server Actions DEMO</h1>
          <p className="text-gray-600 text-xl max-2xl max-auto">Contact form with Mongodb and revalidation</p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
