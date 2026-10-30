import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Check,
  Edit2,
  Users,
  UserPlus,
  Palette,
  Bell,
  Lock,
  HelpCircle,
  Phone,
  Trash2,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { WALLPAPER_OPTIONS } from '../data/mockData';

export default function Drawers() {
  const {
    activeDrawer,
    setActiveDrawer,
    userProfile,
    setUserProfile,
    wallpaper,
    setWallpaper,
    createNewChat,
    createNewGroup,
    contacts,
    activeChatId,
    deleteMessage
  } = useChat();

  const [editName, setEditName] = useState(userProfile.name);
  const [editAbout, setEditAbout] = useState(userProfile.about);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  // New Chat form state
  const [newChatName, setNewChatName] = useState('');
  const [newChatPhone, setNewChatPhone] = useState('');
  const [newChatAbout, setNewChatAbout] = useState('');

  // New Group form state
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  if (!activeDrawer) return null;

  const handleSaveProfile = () => {
    setUserProfile({
      ...userProfile,
      name: editName,
      about: editAbout
    });
    setIsEditingName(false);
    setIsEditingAbout(false);
  };

  const handleCreateChatSubmit = (e) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    createNewChat({
      name: newChatName,
      phone: newChatPhone,
      about: newChatAbout
    });
    setNewChatName('');
    setNewChatPhone('');
    setNewChatAbout('');
  };

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!newGroupName.trim() || selectedGroupMembers.length === 0) return;
    createNewGroup({
      name: newGroupName,
      members: selectedGroupMembers
    });
    setNewGroupName('');
    setSelectedGroupMembers([]);
  };

  const toggleMemberSelection = (memberName) => {
    setSelectedGroupMembers(prev =>
      prev.includes(memberName)
        ? prev.filter(m => m !== memberName)
        : [...prev, memberName]
    );
  };

  const activeContact = contacts.find(c => c.id === activeChatId);

  return (
    <div className="absolute inset-y-0 left-0 w-full md:w-[380px] lg:w-[420px] bg-white dark:bg-[#111b21] z-40 flex flex-col border-r border-gray-200 dark:border-[#222d34] transition-all duration-300">
      {/* Drawer Header */}
      <div className="h-[108px] bg-[#008069] dark:bg-[#202c33] text-white flex items-end p-5 space-x-6 flex-shrink-0">
        <button
          onClick={() => setActiveDrawer(null)}
          className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors mb-0.5"
          aria-label="Close drawer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-medium capitalize mb-0.5">
          {activeDrawer === 'profile' && 'Profile'}
          {activeDrawer === 'settings' && 'Settings'}
          {activeDrawer === 'wallpaper' && 'Chat Wallpaper'}
          {activeDrawer === 'new_chat' && 'New Chat'}
          {activeDrawer === 'new_group' && 'New Group'}
          {activeDrawer === 'contact_info' && 'Contact Info'}
        </h2>
      </div>

      {/* Drawer Body Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 1. Profile Drawer */}
        {activeDrawer === 'profile' && (
          <div className="p-6 space-y-6 text-gray-800 dark:text-[#e9edef]">
            {/* Avatar Photo Section */}
            <div className="flex justify-center my-4">
              <div className="relative group cursor-pointer">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-40 h-40 rounded-full object-cover ring-4 ring-emerald-500/20"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-xs uppercase font-medium">Change Avatar</span>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="bg-white dark:bg-[#111b21] rounded-lg p-4 shadow-sm border border-gray-100 dark:border-[#222d34]">
              <span className="text-xs text-[#008069] dark:text-[#00a884] font-medium block mb-2">Your Name</span>
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 bg-gray-100 dark:bg-[#202c33] px-3 py-1.5 rounded text-sm focus:outline-none"
                  />
                  <button onClick={handleSaveProfile} className="text-[#00a884] p-1" aria-label="Save name">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-base font-normal">{userProfile.name}</span>
                  <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-emerald-500" aria-label="Edit name">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-[#667781] dark:text-[#8696a0] px-2">
              This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </p>

            {/* About Field */}
            <div className="bg-white dark:bg-[#111b21] rounded-lg p-4 shadow-sm border border-gray-100 dark:border-[#222d34]">
              <span className="text-xs text-[#008069] dark:text-[#00a884] font-medium block mb-2">About</span>
              {isEditingAbout ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editAbout}
                    onChange={(e) => setEditAbout(e.target.value)}
                    className="flex-1 bg-gray-100 dark:bg-[#202c33] px-3 py-1.5 rounded text-sm focus:outline-none"
                  />
                  <button onClick={handleSaveProfile} className="text-[#00a884] p-1" aria-label="Save about">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm">{userProfile.about}</span>
                  <button onClick={() => setIsEditingAbout(true)} className="text-gray-400 hover:text-emerald-500" aria-label="Edit about">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Settings Drawer */}
        {activeDrawer === 'settings' && (
          <div className="divide-y divide-gray-100 dark:divide-[#222d34] text-gray-800 dark:text-[#e9edef]">
            {/* User Header Quick Access */}
            <div
              onClick={() => setActiveDrawer('profile')}
              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-[#202c33] cursor-pointer"
            >
              <img src={userProfile.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" />
              <div>
                <h3 className="font-medium text-base">{userProfile.name}</h3>
                <p className="text-xs text-gray-500 dark:text-[#8696a0] truncate">{userProfile.about}</p>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={() => setActiveDrawer('wallpaper')}
                className="w-full flex items-center px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-[#202c33] space-x-4 text-left"
              >
                <Palette className="w-5 h-5 text-gray-500 dark:text-[#8696a0]" />
                <div>
                  <p className="text-sm font-normal">Chat Wallpaper</p>
                  <p className="text-xs text-gray-500 dark:text-[#8696a0]">Choose custom chat background color</p>
                </div>
              </button>

              <div className="w-full flex items-center px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-[#202c33] space-x-4 text-left">
                <Bell className="w-5 h-5 text-gray-500 dark:text-[#8696a0]" />
                <div>
                  <p className="text-sm font-normal">Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-[#8696a0]">Message tones, desktop alerts</p>
                </div>
              </div>

              <div className="w-full flex items-center px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-[#202c33] space-x-4 text-left">
                <Lock className="w-5 h-5 text-gray-500 dark:text-[#8696a0]" />
                <div>
                  <p className="text-sm font-normal">Privacy & Security</p>
                  <p className="text-xs text-gray-500 dark:text-[#8696a0]">Last seen, read receipts, blocked contacts</p>
                </div>
              </div>

              <div className="w-full flex items-center px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-[#202c33] space-x-4 text-left">
                <HelpCircle className="w-5 h-5 text-gray-500 dark:text-[#8696a0]" />
                <div>
                  <p className="text-sm font-normal">Help & Support</p>
                  <p className="text-xs text-gray-500 dark:text-[#8696a0]">Help center, terms and privacy policy</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Wallpaper Selector Drawer */}
        {activeDrawer === 'wallpaper' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-500 dark:text-[#8696a0]">
              Select a wallpaper color theme for your chat background:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {WALLPAPER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWallpaper(opt.id)}
                  className={`h-24 rounded-lg p-3 flex flex-col justify-between border-2 transition-all relative overflow-hidden ${
                    wallpaper === opt.id
                      ? 'border-[#00a884] ring-2 ring-[#00a884]/30'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={opt.color ? { backgroundColor: opt.color } : { backgroundColor: '#111b21' }}
                >
                  <span className="text-xs font-semibold text-white drop-shadow">{opt.name}</span>
                  {wallpaper === opt.id && (
                    <CheckCircle2 className="w-5 h-5 text-[#00a884] bg-white rounded-full self-end" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. New Chat Drawer */}
        {activeDrawer === 'new_chat' && (
          <form onSubmit={handleCreateChatSubmit} className="p-6 space-y-4 text-gray-800 dark:text-[#e9edef]">
            <div className="space-y-1">
              <label className="text-xs text-[#008069] dark:text-[#00a884] font-medium">Contact Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                required
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#202c33] px-3 py-2 rounded text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#008069] dark:text-[#00a884] font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 012-3456"
                value={newChatPhone}
                onChange={(e) => setNewChatPhone(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#202c33] px-3 py-2 rounded text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#008069] dark:text-[#00a884] font-medium">About / Bio</label>
              <input
                type="text"
                placeholder="Hey there! I am using WhatsApp."
                value={newChatAbout}
                onChange={(e) => setNewChatAbout(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#202c33] px-3 py-2 rounded text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a884] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors shadow"
            >
              Start Conversation
            </button>
          </form>
        )}

        {/* 5. New Group Drawer */}
        {activeDrawer === 'new_group' && (
          <form onSubmit={handleCreateGroupSubmit} className="p-6 space-y-5 text-gray-800 dark:text-[#e9edef]">
            <div className="space-y-1">
              <label className="text-xs text-[#008069] dark:text-[#00a884] font-medium">Group Subject / Title</label>
              <input
                type="text"
                placeholder="Group Name"
                required
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#202c33] px-3 py-2 rounded text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#008069] dark:text-[#00a884] font-medium">Add Group Participants</label>
              <div className="divide-y divide-gray-100 dark:divide-[#222d34] max-h-60 overflow-y-auto rounded-lg border border-gray-200 dark:border-[#222d34]">
                {contacts.filter(c => !c.isGroup && !c.isBot).map((c) => {
                  const isSelected = selectedGroupMembers.includes(c.name);
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleMemberSelection(c.name)}
                      className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202c33] transition-colors ${
                        isSelected ? 'bg-emerald-50 dark:bg-[#00a884]/10' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#00a884]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={!newGroupName.trim() || selectedGroupMembers.length === 0}
              className="w-full bg-[#00a884] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-emerald-600 transition-colors shadow"
            >
              Create Group ({selectedGroupMembers.length} selected)
            </button>
          </form>
        )}

        {/* 6. Contact Info Drawer */}
        {activeDrawer === 'contact_info' && activeContact && (
          <div className="divide-y divide-gray-100 dark:divide-[#222d34] text-gray-800 dark:text-[#e9edef]">
            {/* Contact Photo & Name Header */}
            <div className="flex flex-col items-center p-6 text-center">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-emerald-500/20"
              />
              <h3 className="text-xl font-semibold">{activeContact.name}</h3>
              <p className="text-sm text-gray-500 dark:text-[#8696a0] mt-1">
                {activeContact.phone || activeContact.lastSeen}
              </p>
            </div>

            {/* About Section */}
            <div className="p-4 space-y-1">
              <span className="text-xs text-gray-500 dark:text-[#8696a0]">About</span>
              <p className="text-sm font-normal">{activeContact.about}</p>
            </div>

            {/* Group Members list if Group */}
            {activeContact.isGroup && (
              <div className="p-4 space-y-2">
                <span className="text-xs text-gray-500 dark:text-[#8696a0]">
                  {activeContact.groupMembers?.length || 0} Group Members
                </span>
                <div className="space-y-2">
                  {activeContact.groupMembers?.map((m, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm font-medium py-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        {m.charAt(0)}
                      </div>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
