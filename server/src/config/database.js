import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected Successfully!!'))
    .catch(error => console.log('Database connection error: ', error))

const connection = mongoose.connection;

export default connection;


