import { useEffect, useState, type FormEvent } from "react";
import type { CreateNoteData, Note } from "../types/note";

interface NoteFormProps {
  onCreate: (note: CreateNoteData) => Promise<void>;
  editingNote: Note | null;
  onCancelEdit: () => void;
}
const NoteForm = ({ onCreate, editingNote, onCancelEdit }: NoteFormProps) => {
  const [formData, setFormData] = useState<CreateNoteData>({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        category: editingNote.category,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        category: "",
      });
    }
  }, [editingNote]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()||!formData.content.trim()||!formData.category?.trim()) {
      alert("Please fill in all fields")
      return;
    }
    onCreate({
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category?.trim() 
    });
    if (!editingNote) {
      setFormData({
        title: "",
        content: "",
        category: "",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="ring rounded-t-xl flex flex-col p-2 gap-2"
    >
      <h2>{editingNote ? "Edit Note" : "Create Note"}</h2>
      <input
        type="text"
        className="ring rounded p-2"
        placeholder="Note title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        className="ring rounded p-2 h-50"
        id=""
        placeholder="Write your note..."
        name="content"
        value={formData.content}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        className="ring rounded p-2"
        placeholder="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit" className="ring rounded p-2">
        {editingNote ? "Update Note" : "Create Note"}
      </button>
      {editingNote && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default NoteForm;
