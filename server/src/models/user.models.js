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
    },
    profilePic: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    },
    method: {
        type:String,
        require: true,
        enum: ['local', 'google'],
        default: 'local'
    }

}, { timestamps: true })

export default mongoose.model("User", Schema);