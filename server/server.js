import express from "express";
import DB_CONNECT from './src/config/database.js'
import cors from 'cors'
import UploadFile from "./src/config/multer.config.js";

import dotenv from 'dotenv'
dotenv.config()
DB_CONNECT();

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())



app.post('/upload', UploadFile.single('file'), (req, res) => {
    console.log(req.file);
    res.status(200).send("ok")
})




app.listen(PORT, () => console.log(`Server is running on ${PORT}`))