import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/noteRoutes.js";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

connectDB();

const app = express();

app.use(cors({origin:process.env.CLIENT_URL}))

app.use(express.json())

app.use('/api/notes',router)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>console.log(`Server Running in port: ${PORT}.`))