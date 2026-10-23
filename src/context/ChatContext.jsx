import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER, INITIAL_CONTACTS, INITIAL_MESSAGES, INITIAL_STATUSES } from '../data/mockData';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('wa_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Wallpaper state
  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem('wa_wallpaper') || 'default';
  });

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('wa_user_profile');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // Contacts / Conversations List
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('wa_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  // Active Chat ID
  const [activeChatId, setActiveChatId] = useState('chat_bot');

  // Messages dictionary keyed by chatId
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('wa_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Status stories
  const [statuses, setStatuses] = useState(() => {
    const saved = localStorage.getItem('wa_statuses');
    return saved ? JSON.parse(saved) : INITIAL_STATUSES;
  });

  // Active Call Modal state (voice, video, incoming, active)
  const [activeCall, setActiveCall] = useState(null);

  // Status Story Viewer state
  const [activeStatusViewer, setActiveStatusViewer] = useState(null);

  // Active drawer overlay state (profile, settings, new_chat, new_group, contact_info)
  const [activeDrawer, setActiveDrawer] = useState(null);

  // Search filter query in sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState('all'); // all, unread, favorites, groups

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('wa_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('wa_wallpaper', wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    localStorage.setItem('wa_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('wa_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('wa_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('wa_statuses', JSON.stringify(statuses));
  }, [statuses]);

  // Handle active chat change & clear unread count
  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    setContacts(prev =>
      prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c)
    );
  };

  // Toggle Pinned status
  const togglePinChat = (chatId) => {
    setContacts(prev =>
      prev.map(c => c.id === chatId ? { ...c, pinned: !c.pinned } : c)
    );
  };

  // Toggle Favorite status
  const toggleFavoriteChat = (chatId) => {
    setContacts(prev =>
      prev.map(c => c.id === chatId ? { ...c, favorite: !c.favorite } : c)
    );
  };

  // Bot response simulation logic
  const triggerBotResponse = (chatId, userMsgText) => {
    setTimeout(() => {
      let botText = "I'm your WhatsApp AI assistant. How can I help you today?";
      const lower = userMsgText.toLowerCase();

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        botText = "Hello Alex! Hope you're having a productive day! 🌟 What can I assist you with?";
      } else if (lower.includes('feature') || lower.includes('what can you do')) {
        botText = "I can help you simulate real-time chats, voice calls, status updates, send images & audio messages, and search your conversations!";
      } else if (lower.includes('weather')) {
        botText = "The forecast today is sunny with a mild breeze and a high of 72°F ☀️";
      } else if (lower.includes('time')) {
        botText = `Current local time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
      } else {
        const automatedReplies = [
          "Got it! Thanks for sharing.",
          "Interesting! Tell me more about that.",
          "I've logged your request into the system ✅",
          "Sounds good to me! Let me know if you need anything else.",
          "Thanks! Everything looks good on my end."
        ];
        botText = automatedReplies[Math.floor(Math.random() * automatedReplies.length)];
      }

      const botMsg = {
        id: `msg_bot_${Date.now()}`,
        senderId: chatId,
        senderName: contacts.find(c => c.id === chatId)?.name || 'Bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        type: 'text'
      };

      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), botMsg]
      }));
    }, 1200);
  };

  // Send a new message
  const sendMessage = ({ chatId, text, type = 'text', mediaUrl = null, audioDuration = null, caption = '' }) => {
    const targetChatId = chatId || activeChatId;
    if (!targetChatId) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: userProfile.id,
      senderName: userProfile.name,
      text: text || '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent', // sent -> delivered -> read
      type,
      mediaUrl,
      audioDuration,
      caption
    };

    setMessages(prev => ({
      ...prev,
      [targetChatId]: [...(prev[targetChatId] || []), newMsg]
    }));

    // Update message status sequence simulation
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [targetChatId]: (prev[targetChatId] || []).map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)
      }));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [targetChatId]: (prev[targetChatId] || []).map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m)
      }));
    }, 2000);

    // AI Bot auto reply if active chat is AI Assistant or auto-responder enabled
    const currentContact = contacts.find(c => c.id === targetChatId);
    if (currentContact?.isBot) {
      triggerBotResponse(targetChatId, text || 'media');
    } else if (!currentContact?.isGroup && Math.random() > 0.4) {
      // General contact simulated auto response
      setTimeout(() => {
        const contactReplies = [
          "Hey, received your message! 👍",
          "Thanks for the update!",
          "Awesome, let us talk about this soon.",
          "Sounds great!",
          "Got it, thanks!"
        ];
        const replyText = contactReplies[Math.floor(Math.random() * contactReplies.length)];
        const replyMsg = {
          id: `msg_reply_${Date.now()}`,
          senderId: targetChatId,
          senderName: currentContact?.name || 'Contact',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          type: 'text'
        };
        setMessages(prev => ({
          ...prev,
          [targetChatId]: [...(prev[targetChatId] || []), replyMsg]
        }));
      }, 3000);
    }
  };

  // Add Reaction to Message
  const toggleReaction = (chatId, messageId, emoji) => {
    setMessages(prev => {
      const chatMsgs = prev[chatId] || [];
      const updated = chatMsgs.map(msg => {
        if (msg.id !== messageId) return msg;
        const currentReactions = { ...(msg.reactions || {}) };
        if (currentReactions[emoji]) {
          currentReactions[emoji] -= 1;
          if (currentReactions[emoji] <= 0) delete currentReactions[emoji];
        } else {
          currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
        }
        return { ...msg, reactions: currentReactions };
      });
      return { ...prev, [chatId]: updated };
    });
  };

  // Delete message for everyone
  const deleteMessage = (chatId, messageId) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: (prev[chatId] || []).filter(m => m.id !== messageId)
    }));
  };

  // Create New Chat / Contact
  const createNewChat = ({ name, phone, about }) => {
    const newId = `chat_${Date.now()}`;
    const newContact = {
      id: newId,
      name,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=150&auto=format&fit=crop&q=80`,
      isBot: false,
      isGroup: false,
      about: about || 'Hey there! I am using WhatsApp.',
      phone: phone || '+1 (555) 000-0000',
      unreadCount: 0,
      pinned: false,
      favorite: false,
      lastSeen: 'online'
    };

    setContacts(prev => [newContact, ...prev]);
    setMessages(prev => ({ ...prev, [newId]: [] }));
    selectChat(newId);
    setActiveDrawer(null);
  };

  // Create New Group Chat
  const createNewGroup = ({ name, members }) => {
    const newId = `chat_group_${Date.now()}`;
    const newGroup = {
      id: newId,
      name,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      isBot: false,
      isGroup: true,
      groupMembers: ['Alex Morgan', ...members],
      about: `Group created by Alex Morgan`,
      unreadCount: 0,
      pinned: false,
      favorite: false,
      lastSeen: `${members.length + 1} members`
    };

    setContacts(prev => [newGroup, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newId]: [
        {
          id: `msg_sys_${Date.now()}`,
          senderId: 'system',
          senderName: 'System',
          text: `You created group "${name}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          type: 'system'
        }
      ]
    }));
    selectChat(newId);
    setActiveDrawer(null);
  };

  // Add new status story
  const addStatusStory = (imageUrl, caption) => {
    const newStory = {
      id: `story_${Date.now()}`,
      type: 'image',
      url: imageUrl,
      caption: caption || '',
      timestamp: 'Just now'
    };

    setStatuses(prev => {
      const selfIndex = prev.findIndex(s => s.isSelf);
      if (selfIndex !== -1) {
        const updated = [...prev];
        updated[selfIndex] = {
          ...updated[selfIndex],
          updatedAt: 'Just now',
          stories: [...updated[selfIndex].stories, newStory]
        };
        return updated;
      }
      return prev;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        darkMode,
        setDarkMode,
        wallpaper,
        setWallpaper,
        userProfile,
        setUserProfile,
        contacts,
        activeChatId,
        selectChat,
        messages,
        sendMessage,
        toggleReaction,
        deleteMessage,
        togglePinChat,
        toggleFavoriteChat,
        statuses,
        addStatusStory,
        activeCall,
        setActiveCall,
        activeStatusViewer,
        setActiveStatusViewer,
        activeDrawer,
        setActiveDrawer,
        searchQuery,
        setSearchQuery,
        activeTabFilter,
        setActiveTabFilter,
        createNewChat,
        createNewGroup
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
