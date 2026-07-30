import {
    getChats,
    getMessages,
    sendMessage,
    deleteChat,
    
} from "../service/chat.api";
import {
    setChats,
    setCurrentChatId,
    // setError,
    setLoading,
    createNewChat,
    addNewMessage,
    addMessages,
    deleteChatById,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch();

 const handleSendMessage = async ({ message, chatId, chatType }) => {
    try {
        // 1. Submit the message payload directly to the API endpoint
        const data = await sendMessage({ message, chatId, chatType });
        const { chat, aiMessage } = data;
        
        // 2. Provision a new chat thread locally if this is the start of a session
        if (!chatId) {
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
                chatType: chat.chatType // Explicitly passes 'search' or 'email' to state
            }));
        }
        
        // 3. Append the user's message payload into the store
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
        }));
        
        // 4. Append the AI's response message payload (preserves role: 'email' or 'ai')
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role, 
            emailDetails: aiMessage.emailDetails // Preserves email card metadata
        }));
        
        // 5. Explicitly shift focus to this active workspace thread
        dispatch(setCurrentChatId(chat._id));

    } catch (error) {
        console.error("Failed to complete message dispatch cycle:", error);
        // Optional: Trigger your toast notification context here if needed
    }
    // Note: dispatch(setLoading(false)) is omitted here because we removed 
    // full-screen loader initialization to let the smooth inline thinking indicator shine!
};

// Update handleGetChats method to save chatType value into Redux
const handleGetChats = async () => {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(setChats(chats.reduce((acc, chat) => {
        acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            chatType: chat.chatType, // Syncing type mapping configurations
            messages: [],
            lastUpdated: chat.updatedAt,
        };
        return acc;
    }, {})));
    dispatch(setLoading(false));
};

    const handleOpenChat = async (chatId, chats) => {
    if (chats[chatId]?.messages.length === 0) {
        const data = await getMessages(chatId);
        const { messages } = data;

        // Map over the database array, ensuring metadata profiles are preserved
        const formattedMessages = messages.map(msg => ({
            content: msg.content,
            role: msg.role,
            // FIX: Pass the emailDetails object down to your Redux state slice
            emailDetails: msg.emailDetails || null 
        }));

        dispatch(addMessages({
            chatId,
            messages: formattedMessages,
        }));
    }
    dispatch(setCurrentChatId(chatId));
};

    const handleDeleteChat = async (chatId) => {
        dispatch(setLoading(true));
        await deleteChat({ chatId });
        dispatch(deleteChatById(chatId));
        dispatch(setLoading(false));
    };

    return {
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
};
};
