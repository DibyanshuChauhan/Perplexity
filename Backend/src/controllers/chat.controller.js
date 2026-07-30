import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// ==========================================
// 1. SEND MESSAGE (& Maintain Chat History)
// ==========================================

export async function sendMessage(req, res) {
    // Extracting chatType passed directly from the client frontend toggle request
    const { message, chat: chatId, chatType = 'search' } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ success: false, message: "Message content is required." });
    }
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    try {
        let title = null;
        let chat = null;

        // Step A: Handle New Chat Creation with Custom Heading Prefixes
        if (!chatId) {
            try {
                const generatedTitle = await generateChatTitle(message);
                // Prepend an automated tag indicators onto headings based on mode selection
                title = chatType === 'email' ? `✉️ ${generatedTitle}` : `🔍 ${generatedTitle}`;
            } catch (err) {
                console.error("Failed to generate chat title:", err);
                title = chatType === 'email' ? "✉️ New Email Action" : "🔍 New Web Search";
            }

            chat = await chatModel.create({
                user: req.user.id,
                title,
                chatType // Saved into database
            });
        } else {
            chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
            if (!chat) {
                return res.status(404).json({ success: false, message: "Chat session not found or access denied." });
            }
            title = chat.title;
        }

        const activeChatId = chatId || chat._id;

        // Step B: Save User's incoming message
        const userMessage = await messageModel.create({
            chat: activeChatId,
            content: message,
            role: "user"
        });

        const messages = await messageModel.find({ chat: activeChatId }).sort({ createdAt: 1 });

        // Step D: Send entire history context array to the AI service
        let resultData;
        try {
            resultData = await generateResponse(messages);
        } catch (aiError) {
            console.error("AI Generation Error:", aiError);
            return res.status(429).json({ success: false, message: "The AI service is currently busy." });
        }

        // Step E: Save response based on structural configurations
        let savedAiMessage;
        if (resultData.emailAction) {
            savedAiMessage = await messageModel.create({
                chat: activeChatId,
                content: resultData.emailAction.content,
                role: "email",
                emailDetails: {
                    to: resultData.emailAction.to,
                    subject: resultData.emailAction.subject,
                    status: resultData.emailAction.status
                }
            });
        } else {
            savedAiMessage = await messageModel.create({
                chat: activeChatId,
                content: resultData.text,
                role: "ai"
            });
        }

        return res.status(201).json({
            success: true,
            title,
            chat, 
            userMessage,
            aiMessage: savedAiMessage
        });

    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

// ==========================================
// 2. GET ALL CHATS FOR LOGGED IN USER
// ==========================================
// Update getChats controller to return chatType metadata back to client Redux stores
export async function getChats(req, res) {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: "Unauthorized." });
    try {
        const chats = await chatModel.find({ user: req.user.id }).sort({ updatedAt: -1 });
        return res.status(200).json({ success: true, message: "Chats retrieved successfully", chats });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to retrieve chats." });
    }
}
// ==========================================
// 3. GET MESSAGES FOR A SPECIFIC CHAT
// ==========================================
export async function getMessages(req, res) {
    const { chatId } = req.params;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        // Verify chat ownership first
        const chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found or access denied."
            });
        }

        // Retrieve conversation orderly
        const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages
        });
    } catch (error) {
        console.error("Error in getMessages controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve messages.",
            error: error.message
        });
    }
}

// ==========================================
// 4. DELETE CHAT & DEPENDENT MESSAGES
// ==========================================
export async function deleteChat(req, res) {
    const { chatId } = req.params;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        // Find and delete the primary chat document targeting the correct owner
        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found or access denied."
            });
        }

        // Clean up linked conversational sub-history
        await messageModel.deleteMany({ chat: chatId });

        return res.status(200).json({
            success: true,
            message: "Chat and its history deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteChat controller:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while attempting to delete the chat.",
            error: error.message
        });
    }
}