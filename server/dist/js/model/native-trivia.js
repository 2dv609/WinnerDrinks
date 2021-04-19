import mongoose from 'mongoose';
const nativeTriviaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    }
}, { timestamps: true });
export default mongoose.model('NativeTrivia', nativeTriviaSchema);
