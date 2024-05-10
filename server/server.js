import express from "express";
import DB_CONNECT from './src/config/database.js'
import FileRouter from './src/routes/File.routes.js'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
DB_CONNECT();

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/files", FileRouter)



app.listen(PORT, () => console.log(`Server is running on ${PORT}`))