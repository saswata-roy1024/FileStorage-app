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
    Shared: {
        type: Array,
    },
    starred: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true })

Schema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model("File", Schema);