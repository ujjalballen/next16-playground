"use client";

import { useState } from "react";

export default function NotesClient({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  const [noteDatas, setNoteDatas] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDatas({ ...noteDatas, [name]: value });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();

    // here trim means => if there is any extra space
    if (!noteDatas.title.trim() || !noteDatas.content.trim()) {
      console.log("You can't continue");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteDatas.title,
          content: noteDatas.content,
        }),
      });

      const result = await response.json();

      console.log("Res Data: ", result);

      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  console.log("all notes: ", noteDatas);

  return (
    <div className="p-4">
      <div className="space-y-6"></div>

      <form
        onSubmit={handleCreateNote}
        className="bg-white p-5 rounded-lg shadow-md"
      >
        <h1 className="text-black text-xl font-semibold mb-4">
          Create New Note
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={noteDatas.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <textarea
            name="content"
            placeholder="Note Content"
            value={noteDatas.content}
            rows={4}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-600 cursor-pointer hover:transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4 mt-5">
        <h2 className="text-xl font-semibold">Your Notes: ({notes.length})</h2>
        {notes.length === 0 ? (
          <p>Notes not found! Please add a Note!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{note?.title}</h3>
                <div className="flex gap-2">
                  <button className="p-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 cursor-pointer hover:transition-colors">
                    Edit
                  </button>

                  <button className="px-3 py-1 bg-red-700 text-white rounded-xl hover:bg-red-800 cursor-pointer hover:transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-black mb-2">{note?.content}</p>
              <p className="text-sm">
                Created: {new Date(note?.createdAt).toLocaleDateString()}
              </p>
              {note?.updatedAt !== note?.createdAt && (
                <p className="text-sm">
                  Updated: {new Date(note?.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
