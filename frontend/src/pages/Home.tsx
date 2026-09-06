import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../api/noteApi";
import type { CreateNoteData, Note } from "../types/note";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  //editing note
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //create or update
  const handleCreate = async (noteData: CreateNoteData) => {
    try {
      if (editingNote) {
        //update
        const updatedNote = await updateNote(editingNote._id, noteData);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === editingNote._id ? updatedNote : note,
          ),
        );
        setEditingNote(null);
      } else {
        //create
        const newNote = await createNote(noteData);
        setNotes((prevNotes) => [newNote, ...prevNotes]);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id),
      );

      setEditingNote(null)
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };
  const handleCancleEdit = () => {
    setEditingNote(null);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="px-10">
      <h1 className="text-center font-bold text-2xl my-5">Note Keeper</h1>
      <NoteForm
        editingNote={editingNote}
        onCancelEdit={handleCancleEdit}
        onCreate={handleCreate}
      />
      <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
};

export default Home;
