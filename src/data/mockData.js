export const CURRENT_USER = {
  id: 'user_me',
  name: 'Alex Morgan',
  phone: '+1 (555) 019-2831',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  about: 'Coding the future 🚀 | Hey there! I am using WhatsApp.',
  status: 'online'
};

export const INITIAL_CONTACTS = [
  {
    id: 'chat_bot',
    name: 'WhatsApp AI Assistant',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    isBot: true,
    isGroup: false,
    about: 'I am your automated smart assistant!',
    phone: '+1 (800) 555-0100',
    unreadCount: 1,
    pinned: true,
    favorite: true,
    lastSeen: 'online'
  },
  {
    id: 'chat_dev_team',
    name: '🚀 Frontend Dev Team',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    isGroup: true,
    groupMembers: ['Alex Morgan', 'Sarah Connor', 'Marcus Vance', 'David Miller'],
    about: 'Official Dev Team Channel',
    unreadCount: 2,
    pinned: true,
    favorite: true,
    lastSeen: 'click for group info'
  },
  {
    id: 'chat_sarah',
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    isGroup: false,
    about: 'Cybersecurity Analyst 🛡️ | No fate but what we make.',
    phone: '+1 (555) 234-5678',
    unreadCount: 0,
    pinned: false,
    favorite: true,
    lastSeen: 'online'
  },
  {
    id: 'chat_marcus',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    isGroup: false,
    about: 'Audio Engineer & Producer 🎧 🎙️',
    phone: '+1 (555) 876-5432',
    unreadCount: 0,
    pinned: false,
    favorite: false,
    lastSeen: 'today at 11:42 AM'
  },
  {
    id: 'chat_elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    isGroup: false,
    about: 'Travel & Wildlife Photographer 📸 🌍',
    phone: '+1 (555) 345-6789',
    unreadCount: 0,
    pinned: false,
    favorite: false,
    lastSeen: 'yesterday at 9:15 PM'
  },
  {
    id: 'chat_david',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    isGroup: false,
    about: 'Product Manager @ Tech Corp 📊',
    phone: '+1 (555) 901-2345',
    unreadCount: 0,
    pinned: false,
    favorite: false,
    lastSeen: 'last seen today at 8:05 AM'
  }
];

export const INITIAL_MESSAGES = {
  chat_bot: [
    {
      id: 'msg_b1',
      senderId: 'chat_bot',
      senderName: 'WhatsApp AI Assistant',
      text: 'Hello Alex! 👋 Welcome to WhatsApp Web. I am your AI assistant. Send me any message, or ask me for help!',
      timestamp: '10:00 AM',
      status: 'read',
      type: 'text'
    }
  ],
  chat_dev_team: [
    {
      id: 'msg_d1',
      senderId: 'sarah_id',
      senderName: 'Sarah Connor',
      text: 'Hey everyone, please review the latest PR for the dark theme design system update.',
      timestamp: '09:15 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 'msg_d2',
      senderId: 'marcus_id',
      senderName: 'Marcus Vance',
      text: 'I checked it out! The contrast ratio looks fantastic now 🔥',
      timestamp: '09:20 AM',
      status: 'read',
      type: 'text',
      reactions: { '🔥': 2, '👍': 3 }
    },
    {
      id: 'msg_d3',
      senderId: 'sarah_id',
      senderName: 'Sarah Connor',
      text: 'Great! Let us merge it before the afternoon demo.',
      timestamp: '09:25 AM',
      status: 'delivered',
      type: 'text'
    }
  ],
  chat_sarah: [
    {
      id: 'msg_s1',
      senderId: 'user_me',
      senderName: 'Alex Morgan',
      text: 'Hi Sarah, do you have time for a quick call regarding the API security review?',
      timestamp: 'Yesterday',
      status: 'read',
      type: 'text'
    },
    {
      id: 'msg_s2',
      senderId: 'chat_sarah',
      senderName: 'Sarah Connor',
      text: 'Sure! I just finished analyzing the logs. Everything looks secure.',
      timestamp: 'Yesterday',
      status: 'read',
      type: 'text'
    },
    {
      id: 'msg_s3',
      senderId: 'chat_sarah',
      senderName: 'Sarah Connor',
      text: 'Here is a screenshot of our security telemetry dashboard:',
      timestamp: 'Yesterday',
      status: 'read',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      caption: 'Telemetry Dashboard - Zero Threats Detected'
    },
    {
      id: 'msg_s4',
      senderId: 'user_me',
      senderName: 'Alex Morgan',
      text: 'Awesome work! Thanks Sarah ⚡',
      timestamp: 'Yesterday',
      status: 'read',
      type: 'text',
      reactions: { '❤️': 1 }
    }
  ],
  chat_marcus: [
    {
      id: 'msg_m1',
      senderId: 'chat_marcus',
      senderName: 'Marcus Vance',
      text: 'Hey Alex, check out this sample voice recording for the app notification sound effect:',
      timestamp: '11:30 AM',
      status: 'read',
      type: 'audio',
      audioDuration: '0:14'
    },
    {
      id: 'msg_m2',
      senderId: 'user_me',
      senderName: 'Alex Morgan',
      text: 'Sounds crisp and clean! Let us use this for the default message tone.',
      timestamp: '11:32 AM',
      status: 'read',
      type: 'text'
    }
  ],
  chat_elena: [
    {
      id: 'msg_e1',
      senderId: 'chat_elena',
      senderName: 'Elena Rostova',
      text: 'Captured this sunrise view today high in the mountains 🏔️🌅',
      timestamp: '8:45 AM',
      status: 'read',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
      caption: 'Alpine Sunrise'
    },
    {
      id: 'msg_e2',
      senderId: 'user_me',
      senderName: 'Alex Morgan',
      text: 'Breathtaking photo! What camera lens did you use?',
      timestamp: '8:50 AM',
      status: 'read',
      type: 'text'
    }
  ],
  chat_david: [
    {
      id: 'msg_dv1',
      senderId: 'chat_david',
      senderName: 'David Miller',
      text: 'Hey Alex, sprint planning is scheduled for tomorrow at 10 AM. See you there!',
      timestamp: 'Oct 22',
      status: 'read',
      type: 'text'
    }
  ]
};

export const INITIAL_STATUSES = [
  {
    id: 'status_user',
    userId: 'user_me',
    userName: 'My Status',
    userAvatar: CURRENT_USER.avatar,
    updatedAt: 'Tap to add status update',
    isSelf: true,
    stories: []
  },
  {
    id: 'status_sarah',
    userId: 'chat_sarah',
    userName: 'Sarah Connor',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    updatedAt: '25 minutes ago',
    viewed: false,
    stories: [
      {
        id: 'story_s1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
        caption: 'Late night code review 💻✨',
        timestamp: '25m ago'
      }
    ]
  },
  {
    id: 'status_elena',
    userId: 'chat_elena',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    updatedAt: '2 hours ago',
    viewed: false,
    stories: [
      {
        id: 'story_e1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        caption: 'Morning walk along the ocean shore 🌊',
        timestamp: '2h ago'
      },
      {
        id: 'story_e2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
        caption: 'Nature at its finest 🍃',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'status_marcus',
    userId: 'chat_marcus',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    updatedAt: '5 hours ago',
    viewed: true,
    stories: [
      {
        id: 'story_m1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
        caption: 'Studio session under way! 🎵🎹',
        timestamp: '5h ago'
      }
    ]
  }
];

export const WALLPAPER_OPTIONS = [
  { id: 'default', name: 'WhatsApp Doodle (Dark/Light)', bgClass: 'bg-whatsapp-doodle' },
  { id: 'solid_dark', name: 'Solid Charcoal', color: '#0b141a' },
  { id: 'solid_green', name: 'Classic Dark Teal', color: '#051d18' },
  { id: 'solid_blue', name: 'Deep Midnight Blue', color: '#0a192f' },
  { id: 'solid_burgundy', name: 'Deep Wine', color: '#1a0910' },
  { id: 'solid_light_beige', name: 'Light Beige', color: '#efeae2' }
];
