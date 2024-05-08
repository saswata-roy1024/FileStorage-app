import express from "express";
import DB_CONNECT from './src/config/database.js'

import dotenv from 'dotenv'
dotenv.config()
DB_CONNECT();

const PORT = process.env.PORT || 5000

const app = express()


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))