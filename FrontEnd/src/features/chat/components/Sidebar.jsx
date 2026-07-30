import { useState } from "react";
import {
    FiPlus,
    FiSearch,
    FiMessageSquare,
    FiMail,
    FiTrash2,
    FiZap,
    FiUser,
    FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../auth/hook/useAuth";

const Sidebar = ({
    chats,
    currentChatId,
    user,
    openChat,
    handleDelete,
    handleNewThread,
    activeTab,
    setActiveTab,
    openProfile,
}) => {
    const { handleLogout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    const chatList = Object.values(chats);
    
    const filteredChats = chatList.filter((chatItem) => {
        const isEmailChat = chatItem.chatType === "email";
        const isSearchChat = chatItem.chatType === "search" || !chatItem.chatType;

        const matchesTab = activeTab === "emails" ? isEmailChat : isSearchChat;
        const matchesSearch = chatItem.title?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    // ✅ New Helper: Remove Markdown from title
    const cleanTitle = (title) => {
        if (!title) return "Untitled";
        
        return title
            .replace(/[#*_`~>]/g, '')           // Remove common markdown characters
            .replace(/\*\*(.*?)\*\*/g, '$1')    // Bold
            .replace(/\*(.*?)\*/g, '$1')        // Italic
            .replace(/__(.*?)__/g, '$1')        // Underline
            .replace(/`(.*?)`/g, '$1')          // Inline code
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
            .trim()
            .slice(0, 60);                      // Limit length
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setSearchQuery(""); 

        if (currentChatId) {
            const currentChat = chats[currentChatId];
            const isEmail = currentChat?.chatType === "email";
            
            if ((tabName === "threads" && isEmail) || (tabName === "emails" && !isEmail)) {
                handleNewThread(); 
            }
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#0d0d0d] text-neutral-100 select-none">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5">
                <div className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <FiZap className="text-neutral-950" size={16} />
                </div>
                <span className="font-semibold text-lg tracking-tight bg-linear-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                    Perplexity
                </span>
            </div>

            {/* New Thread */}
            <div className="px-4 mb-4">
                <button
                    onClick={handleNewThread}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all text-neutral-200 hover:text-white text-sm font-medium py-2.5 rounded-xl cursor-pointer"
                >
                    <FiPlus size={16} />
                    New Thread
                </button>
            </div>

            {/* Tabs */}
            <div className="px-4 mb-3">
                <div className="flex bg-[#121212] p-1 rounded-xl border border-neutral-800/60">
                    <button
                        type="button"
                        onClick={() => handleTabChange("threads")}
                        className={`relative flex-1 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition-colors text-center ${
                            activeTab === "threads" ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                    >
                        {activeTab === "threads" && (
                            <motion.div layoutId="activeSidebarTab" className="absolute inset-0 bg-teal-500 rounded-lg" />
                        )}
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                            <FiMessageSquare size={12} />
                            Chats
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleTabChange("emails")}
                        className={`relative flex-1 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition-colors text-center ${
                            activeTab === "emails" ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                    >
                        {activeTab === "emails" && (
                            <motion.div layoutId="activeSidebarTab" className="absolute inset-0 bg-teal-500 rounded-lg" />
                        )}
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                            <FiMail size={12} />
                            Emails
                        </span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-3">
                <div className="flex items-center gap-2.5 bg-[#121212] rounded-xl px-3.5 py-2 border border-neutral-800 focus-within:border-teal-500/30 transition-all duration-200">
                    <FiSearch className="text-neutral-500 shrink-0" size={14} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={activeTab === "threads" ? "Search threads..." : "Search dispatched mail..."}
                        className="bg-transparent outline-none text-xs w-full placeholder:text-neutral-600 text-neutral-300 py-1.5"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                    {searchQuery ? "Search Results" : (activeTab === "threads" ? "Recent Conversations" : "Archived Dispatches")}
                </p>

                <AnimatePresence>
                    {filteredChats.length > 0 ? (
                        filteredChats.map((item) => {
                            const isActive = item.id === currentChatId;
                            const displayTitle = cleanTitle(item.title);

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    className={`group flex items-center rounded-xl transition-all ${
                                        isActive ? "bg-neutral-900 border border-neutral-800/80" : "hover:bg-neutral-900/40 border border-transparent"
                                    }`}
                                >
                                    <button
                                        onClick={() => openChat(item.id)}
                                        className="flex-1 flex items-center gap-3 px-3.5 py-3 text-xs text-neutral-300 transition-colors text-left truncate cursor-pointer"
                                    >
                                        {activeTab === "emails" ? (
                                            <FiMail className={`${isActive ? "text-teal-400" : "text-neutral-600"} shrink-0`} size={14} />
                                        ) : (
                                            <FiMessageSquare className={`${isActive ? "text-teal-400" : "text-neutral-600"} shrink-0`} size={14} />
                                        )}
                                        <span className={`truncate font-medium ${isActive ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-200"}`}>
                                            {displayTitle}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, item.id)}
                                        className="p-2 mr-1 rounded-lg text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-neutral-800 hover:text-rose-400 transition-all cursor-pointer"
                                    >
                                        <FiTrash2 size={13} />
                                    </button>
                                </motion.div>
                            );
                        })
                    ) : (
                        <motion.div
                            key={`empty-${activeTab}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-xs text-neutral-600 font-medium font-mono"
                        >
                            {searchQuery ? "No matching criteria matched" : `No ${activeTab === "threads" ? "chats" : "email records"} found`}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-900 px-4 py-3 bg-[#090909] flex flex-col gap-1.5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/5 px-2.5 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                    <FiLogOut size={13} className="shrink-0" />
                    Disconnect Workspace
                </button>

                <button
                    onClick={openProfile}
                    className="w-full flex items-center gap-3 bg-neutral-950/20 hover:bg-neutral-900/40 border border-neutral-900/60 hover:border-neutral-800 rounded-xl p-2 transition-all cursor-pointer group/profile text-left"
                >
                    <div className="h-9 w-9 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700/30 group-hover/profile:border-teal-500/20 group-hover/profile:text-teal-400 text-neutral-400 transition-all">
                        <FiUser size={16} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold truncate text-neutral-200 group-hover/profile:text-white transition-colors">
                            {user?.username || "Guest User"}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-400/90 bg-teal-500/10 px-2 py-0.5 rounded-full mt-0.5">
                            <FiZap size={9} />
                            Pro Account
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;