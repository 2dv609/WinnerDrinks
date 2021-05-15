import mongoose from 'mongoose';
const partySchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }
}, { timestamps: true });
export default mongoose.model('Party', partySchema);
