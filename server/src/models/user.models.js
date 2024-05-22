import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    }

}, { timestamps: true })

export default mongoose.model("User", Schema);