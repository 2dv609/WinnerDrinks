import mongoose from 'mongoose';
const backToBackSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    }
}, { timestamps: true });
export default mongoose.model('BackToBack', backToBackSchema);
