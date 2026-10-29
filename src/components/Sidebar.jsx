import React, { useState } from 'react';
import {
  MessageSquare,
  CircleDashed,
  Users,
  MoreVertical,
  Search,
  Pin,
  Star,
  Check,
  CheckCheck,
  Moon,
  Sun,
  Plus,
  Filter
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

export default function Sidebar() {
  const {
    contacts,
    activeChatId,
    selectChat,
    messages,
    togglePinChat,
    toggleFavoriteChat,
    userProfile,
    darkMode,
    setDarkMode,
    setActiveDrawer,
    setActiveStatusViewer,
    statuses,
    searchQuery,
    setSearchQuery,
    activeTabFilter,
    setActiveTabFilter
  } = useChat();

  const [showMenu, setShowMenu] = useState(false);

  // Filter contacts based on search query & selected tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.about.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTabFilter === 'unread') return contact.unreadCount > 0;
    if (activeTabFilter === 'favorites') return contact.favorite;
    if (activeTabFilter === 'groups') return contact.isGroup;
    return true;
  });

  // Sort contacts: Pinned first, then by recent activity
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const getLastMessage = (chatId) => {
    const chatMsgs = messages[chatId] || [];
    if (chatMsgs.length === 0) return null;
    return chatMsgs[chatMsgs.length - 1];
  };

  const hasUnreadStatus = statuses.some(s => !s.isSelf && !s.viewed);

  return (
    <div className="flex flex-col w-full md:w-[380px] lg:w-[420px] h-full border-r border-gray-200 dark:border-[#222d34] bg-white dark:bg-[#111b21] flex-shrink-0 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-[#222d34]">
        {/* User Profile Avatar */}
        <button
          onClick={() => setActiveDrawer('profile')}
          className="relative rounded-full focus:outline-none hover:opacity-90 transition-opacity"
          title="Profile Settings"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 text-[#54656f] dark:text-[#aebac1]">
          {/* Status Tab */}
          <button
            onClick={() => setActiveStatusViewer(statuses[1] || statuses[0])}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] relative transition-colors"
            title="Status Updates"
          >
            <CircleDashed className="w-5 h-5" />
            {hasUnreadStatus && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#00a884] rounded-full ring-2 ring-white dark:ring-[#202c33]"></span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* New Chat */}
          <button
            onClick={() => setActiveDrawer('new_chat')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
            title="New Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#233138] rounded-md shadow-lg py-1 z-50 text-sm text-gray-800 dark:text-[#d1d7db] border border-gray-100 dark:border-[#222d34]">
                <button
                  onClick={() => { setShowMenu(false); setActiveDrawer('new_group'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#182229] flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>New group</span>
                </button>
                <button
                  onClick={() => { setShowMenu(false); setActiveDrawer('settings'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#182229]"
                >
                  Settings
                </button>
                <button
                  onClick={() => { setShowMenu(false); setActiveDrawer('profile'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#182229]"
                >
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Tabs */}
      <div className="p-2 bg-white dark:bg-[#111b21] border-b border-gray-100 dark:border-[#222d34] space-y-2">
        <div className="relative flex items-center bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-[#54656f] dark:text-[#8696a0] mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 dark:text-[#d1d7db] placeholder-[#54656f] dark:placeholder-[#8696a0] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'favorites', label: 'Favorites' },
            { id: 'groups', label: 'Groups' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabFilter(tab.id)}
              aria-pressed={activeTabFilter === tab.id}
              aria-label={`Filter by ${tab.label} chats`}
              className={`px-3 py-1 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a884] ${
                activeTabFilter === tab.id
                  ? 'bg-[#e7fce3] dark:bg-[#0a332c] text-[#008069] dark:text-[#00a884]'
                  : 'bg-[#f0f2f5] dark:bg-[#202c33] text-[#54656f] dark:text-[#8696a0] hover:bg-gray-200 dark:hover:bg-[#2a3942]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-[#222d34]">
        {sortedContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-[#54656f] dark:text-[#8696a0]">
            <p className="text-sm font-medium">No chats found</p>
            <p className="text-xs mt-1">Try searching for something else or create a new chat.</p>
          </div>
        ) : (
          sortedContacts.map((contact) => {
            const lastMsg = getLastMessage(contact.id);
            const isActive = activeChatId === contact.id;

            return (
              <div
                key={contact.id}
                onClick={() => selectChat(contact.id)}
                className={`group flex items-center px-4 py-3 cursor-pointer transition-colors relative ${
                  isActive
                    ? 'bg-[#f0f2f5] dark:bg-[#2a3942]'
                    : 'hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]'
                }`}
              >
                {/* Avatar */}
                <div className="relative mr-3 flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.lastSeen === 'online' && !contact.isGroup && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#111b21] rounded-full"></span>
                  )}
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-[#e9edef] truncate">
                      {contact.name}
                    </h2>
                    <span className="text-xs text-[#667781] dark:text-[#8696a0] flex-shrink-0 ml-2">
                      {lastMsg ? lastMsg.timestamp : ''}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#667781] dark:text-[#8696a0] truncate flex items-center mr-2">
                      {lastMsg && lastMsg.senderId === userProfile.id && (
                        <span className="mr-1 inline-block">
                          {lastMsg.status === 'read' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                          ) : lastMsg.status === 'delivered' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-gray-400 dark:text-[#8696a0]" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-gray-400 dark:text-[#8696a0]" />
                          )}
                        </span>
                      )}
                      {lastMsg ? (
                        lastMsg.type === 'image' ? '📷 Photo' :
                        lastMsg.type === 'audio' ? '🎵 Audio message' :
                        lastMsg.text
                      ) : (
                        contact.about
                      )}
                    </p>

                    {/* Unread badge & Pin/Favorite action buttons */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {contact.pinned && (
                        <Pin className="w-3.5 h-3.5 text-[#54656f] dark:text-[#8696a0] rotate-45" />
                      )}

                      {contact.unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#00a884] text-white rounded-full min-w-[18px] text-center">
                          {contact.unreadCount}
                        </span>
                      )}

                      {/* Hover action menu button */}
                      <div className="hidden group-hover:flex items-center space-x-1 pl-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); togglePinChat(contact.id); }}
                          title={contact.pinned ? 'Unpin chat' : 'Pin chat'}
                          className="p-1 hover:text-emerald-500 text-gray-400 dark:text-[#8696a0]"
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavoriteChat(contact.id); }}
                          title={contact.favorite ? 'Remove from favorites' : 'Mark as favorite'}
                          className="p-1 hover:text-amber-400 text-gray-400 dark:text-[#8696a0]"
                        >
                          <Star className={`w-3.5 h-3.5 ${contact.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
