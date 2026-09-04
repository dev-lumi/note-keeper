import express from 'express'
import {createNote, getNote, getNotes} from '../controllers/noteController.js'

const router = express.Router()

router.post('/',createNote)
router.get('/',getNotes)
router.get('/:id',getNote)

export default router