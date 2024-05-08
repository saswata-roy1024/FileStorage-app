import mongoose from 'mongoose';

const DB_CONNECT = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Database connected Successfully!!'))
    } catch (error) {
        console.log('Database Error: ', error)
    }
}

export default DB_CONNECT;
  