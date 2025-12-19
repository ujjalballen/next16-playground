"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NotesClient({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  const [noteDatas, setNoteDatas] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDatas({ ...noteDatas, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingNote({ ...editingNote, [name]: value });
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

      if (result.success) {
        setNotes([...notes, result.data]);
        toast.success("Successfully created!");
        setNoteDatas({ title: "", content: "" });
      }

      console.log("Res Data: ", result);

      setLoading(false);
    } catch (error) {
      console.error("Can't added Note:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  async function deleteNote(id) {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        console.log("Data: ", result.data);
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Note Deleted Successfully!");
      } else {
        toast.error(result?.error);
      }
    } catch (error) {
      console.error("Error Delete: ", error);
      toast.error("Somethings went wrong");
    }
  }

  async function updateNote(id) {
    // emove whitespace from both the beginning and the end of a string
    if (!editingNote.title.trim() || !editingNote.content.trim()) {
      console.log("You can't continue");
      toast.error("You can't continue");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingNote.title,
          content: editingNote.content,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        toast.success("Note updated successfully");

        setEditingId(null);
        setEditingNote({ title: "", content: "" });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error Updated: ", error);
      toast.error("Faild to Updated");
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (note) => {
    if (!note._id || !note.title || !note.content) {
      toast.error("Note is not exsit");
      return;
    }

    setEditingId(note._id);
    setEditingNote({ title: note.title, content: note.content });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingNote({ title: "", content: "" });
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
              {editingId === note._id ? (
                <>
                  {/* Editing Mode */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Note Title"
                      value={editingNote.title}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Write your content"
                      value={editingNote.content}
                      onChange={handleEditChange}
                      rows={4}
                      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <div className="flex gap-2">
                      <button
                        disabled={loading}
                        onClick={() => updateNote(note._id)}
                        className="px-3 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-600 cursor-pointer hover:transition-colors disabled:opacity-50"
                      >
                        {loading ? "Updating..." : "Update Note"}
                      </button>
                      <button
                        onClick={() => cancelEdit}
                        className="px-3 py-2 bg-amber-200 text-white rounded-xl hover:bg-amber-300 cursor-pointer hover:transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{note?.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="p-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 cursor-pointer hover:transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteNote(note._id)} // (e)
                        className="px-3 py-1 bg-red-700 text-white rounded-xl hover:bg-red-800 cursor-pointer hover:transition-colors"
                      >
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
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
