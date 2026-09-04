import express from 'express'
import {createNote, deleteNote, getNote, getNotes, updateNote} from '../controllers/noteController.js'

const router = express.Router()

router.post('/',createNote)
router.get('/',getNotes)
router.get('/:id',getNote)
router.patch('/:id',updateNote)
router.delete('/:id',deleteNote)

export default router