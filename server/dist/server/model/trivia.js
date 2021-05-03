import mongoose from 'mongoose';
const triviaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    }
}, { timestamps: true });
export default mongoose.model('Trivia', triviaSchema);
