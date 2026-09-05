import axios from "axios";
import type { CreateNoteData, Note } from "../types/note";

const API =  "http://localhost:3000/api/notes"



//get all
export const getNotes = async():Promise<Note[]>=> {
    const response = await axios.get<Note[]>(API)
    console.log(response.data)
    return response.data;
}


export const getNoteById = async (id: string):Promise<Note>=>{
    const response = await axios.get(`${API}/${id}`)
    return response.data;
} 

//post create note
export const createNote = async(note:CreateNoteData):Promise<Note> => {
    const response = await axios.post<Note>(API,note)
    return response.data;
}

export const updateNote =async (id :string, note:Partial<Note>):Promise<Note> =>{
    const response = await axios.patch<Note>(`${API}/${id}`,note)
    return response.data;
}

//delete
export const deleteNote = async(id:string):Promise<void> => {
    await axios.delete(`${API}/${id}`)
}

