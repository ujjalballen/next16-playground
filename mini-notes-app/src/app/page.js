import NotesClient from "../../components/NotesClients";
import dbConnect from "../../lib/db";
import Note from "../../models/Note";

async function getNotes() {
  await dbConnect();
  // const notes = await Note.find({});
  const notes = await Note.find({}).lean();

  const serializedNotes = notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));

  return serializedNotes;
};

export default async function Home() {
  const notes = await getNotes();


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes APP</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
}
