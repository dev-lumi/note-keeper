import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) =>Promise<void>;
}

const NoteCard = ({ note, onDelete , onEdit}: NoteCardProps) => {
  return (
    <div className="px-2 py-4 rounded h-50 shadow-xl ring">
      <h2 className="text-xl font-bold">{note.title} </h2>
      <p className="text-[14px] font-semibold text-gray-700">{note.content} </p>
      <p className="capitalise font-bold">{note.category}</p>
      <div className="mt-2">
        <button className="ring px-2 py-1 rounded mr-2" onClick={()=> onEdit(note._id)}>Edit</button>
        <button className="ring px-2 py-1 rounded mr-2" onClick={() => onDelete(note._id)}>Delte</button>
      </div>
    </div>
  );
};

export default NoteCard;
