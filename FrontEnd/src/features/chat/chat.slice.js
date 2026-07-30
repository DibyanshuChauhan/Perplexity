import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    // NEW: Check if there's an existing chat ID saved from a previous session on browser load
    currentChatId: localStorage.getItem("active_chat_id") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title, chatType } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        chatType: chatType || 'search',
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },

    addNewMessage: (state, action) => {
      const { chatId, content, role, emailDetails } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push({ 
          content, 
          role,
          emailDetails: emailDetails || null 
        });
      }
    },

    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push(...messages);
      }
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
      
      // NEW: Persist the current ID or clear it if null
      if (action.payload) {
        localStorage.setItem("active_chat_id", action.payload);
      } else {
        localStorage.removeItem("active_chat_id");
      }
    },

    deleteChatById: (state, action) => {
      const chatId = action.payload;
      delete state.chats[chatId];

      if (state.currentChatId === chatId) {
        const remainingChatIds = Object.keys(state.chats);
        const nextChatId = remainingChatIds[0] || null;
        state.currentChatId = nextChatId;
        
        // NEW: Update local storage on deletion matching context changes
        if (nextChatId) {
          localStorage.setItem("active_chat_id", nextChatId);
        } else {
          localStorage.removeItem("active_chat_id");
        }
      }
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  deleteChatById,
} = chatSlice.actions;
export default chatSlice.reducer;