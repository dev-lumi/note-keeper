import Note from "../models/Note.js"

//create note
export const createNote = async(req,res)=>{
    try{
        const {title,content,category} = req.body
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

//update one
export const updateNote = async (req,res) => {
    try {
        // const {title,content,category} = req.body
        const {id} = req.params
        const updateNote = await Note.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateNote){return res.status(404).json({message:"id is not valid."})}
        res.status(200).json(updateNote)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//delete one
export const deleteNote = async(req,res)=>{
    try {
      
      const  deleteNote =  await Note.findByIdAndDelete(req.params.id)
       if(!deleteNote){ return res.status(404).json({message: "id is invalid."})}
        res.status(200).json({message: "successfully deleted."})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}