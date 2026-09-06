import type { Note } from "../types/note";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (note : Note) => void;
}

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  return (
    <div className="ring rounded-b-xl p-2 mt-2 flex flex-col gap-2">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default NoteList;
