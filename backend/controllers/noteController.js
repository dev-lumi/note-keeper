import Note from "../models/Note.js"

//create note
export const createNote = async(req,res)=>{
    try{
        const {title,content} = req.body
        const note = await Note.create({title,content})
        res.status(201).json(note)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//get all notes
export const getNotes = async(req,res)=>{
    try{
        const notes = await Note.find();
        if(!notes){return res.status(404).json({message: "empty notes."})}
        res.status(200).json(notes)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//get single note
export const getNote = async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:"No file is belongs to this id."})
        }
        res.status(200).json(note)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}