import NotesClient from "../../components/NotesClients";
import dbConnect from "../../lib/db";

export default async function Home() {
  await dbConnect();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes APP</h1>
      <NotesClient />
    </div>
  );
}
