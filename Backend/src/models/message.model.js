import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [ 'user', 'ai', 'email' ], // Added 'email' role
            required: true,
        },
        // Optional structural storage specifically for email dispatches
        emailDetails: {
            to: { 
                type: String,
                trim: true 
            },
            subject: { 
                type: String,
                trim: true 
            },
            status: { 
                type: String,
                enum: ['sent', 'failed'], default: 'sent' 
            },
        }
    },
    { timestamps: true }
);

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;