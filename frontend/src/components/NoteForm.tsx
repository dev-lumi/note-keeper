import { useState, type FormEvent } from "react";
import type { CreateNoteData } from "../types/note";

interface NoteFormProps {
  onCreate: (note: CreateNoteData) => Promise<void>;
}
const NoteForm = ({ onCreate }: NoteFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await onCreate({ title, content });

    setTitle("");
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit} className="ring rounded-t-xl flex flex-col p-2 gap-2">
      <input type="text" className="ring rounded p-2" placeholder="Note title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <textarea name="" className="ring rounded p-2 h-50" id="" placeholder="Write your note..." value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
      <input type="text" className="ring rounded p-2" placeholder="category"  />
      <button type="submit" className="ring rounded p-2">Add Note</button>
    </form>
  );
};

export default NoteForm;
