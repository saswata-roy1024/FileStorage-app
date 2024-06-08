import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
}, { timestamps: true });

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 60 });

export default mongoose.model("Otp", otpSchema);