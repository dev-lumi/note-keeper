
import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes } from "../api/noteApi";
import type { CreateNoteData, Note } from "../types/note";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async ()=>{
    try {
      const data = await getNotes()
      setNotes(data)
      // console.log(notes)
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{fetchNotes()},[])

  const handleCreate = async(noteData: CreateNoteData)=>{
    try {
      const newNote = await createNote(noteData)
      setNotes((prevNotes)=>[newNote,...prevNotes])
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id:string)=>{
    try {
      await deleteNote(id)
      setNotes((previousNotes)=>previousNotes.filter((note)=>note._id!==id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async(id:string, note: CreateNoteData)=>{
    try {
      const updatedNote = await 
    } catch (error) {
      
    }
  }

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <main className="px-10">
      <h1 className="text-center font-bold text-2xl my-5">Note Keeper</h1>
      <NoteForm onCreate={handleCreate}/>
      <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit}/>
    </main>
  );
};

export default Home;
