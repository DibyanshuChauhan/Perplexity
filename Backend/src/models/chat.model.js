import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            default: 'New Chat',
            trim: true,
        },
        // NEW: Stores the explicit contextual category of the thread workspace
        chatType: {
            type: String,
            enum: ['search', 'email'],
            default: 'search',
            required: true
        }
    },
    { timestamps: true }
);

const chatModel = mongoose.model('Chat', chatSchema);
export default chatModel;