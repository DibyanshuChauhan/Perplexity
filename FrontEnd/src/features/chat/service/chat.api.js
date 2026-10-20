import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/chats` 
    : "/api/chats";

const api = axios.create({
    baseURL,
    withCredentials: true
});

export const sendMessage = async ({ message, chatId, chatType }) => {
    const response = await api.post("/message", {
        message,
        chat: chatId,
        chatType // Sent up to the controller payload request thread
    });
    return response.data;
};

export const getChats = async () => {
    const response = await api.get("/");
    return response.data;
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/${chatId}/messages`);
    return response.data;
}

export const deleteChat = async ({chatId}) => {
    const response = await api.delete(`/delete/${chatId}`);
    return response.data;
}