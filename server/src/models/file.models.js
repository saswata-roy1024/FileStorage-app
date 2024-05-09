import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    filename: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true
    },
    type: {
        type: String,
        default: null
    },
    format: {
        type: String,
        default: null
    },
    size: {
        type: String,
    },

}, { timestamps: true })

export default mongoose.model("File", Schema);