import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  X,
  Play,
  Pause,
  Trash2,
  Lock,
  Image as ImageIcon,
  Check,
  CheckCheck,
  ChevronDown
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

const EMOJI_LIST = ['😀', '😂', '😍', '🔥', '👍', '❤️', '🎉', '🙌', '🙏', '💯', '✨', '🚀', '😎', '😅', '👏', '🥳'];

export default function ChatArea() {
  const {
    contacts,
    activeChatId,
    messages,
    sendMessage,
    toggleReaction,
    deleteMessage,
    setActiveCall,
    setActiveDrawer,
    wallpaper,
    userProfile
  } = useChat();

  const [textInput, setTextInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState(null);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);

  const messagesEndRef = useRef(null);
  const recordingTimerRef = useRef(null);

  const activeContact = contacts.find(c => c.id === activeChatId);
  const activeMessages = messages[activeChatId] || [];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, activeChatId]);

  // Handle Voice Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(recordingTimerRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(recordingTimerRef.current);
  }, [isRecording]);

  const handleSendText = (e) => {
    e?.preventDefault();
    if (!textInput.trim()) return;
    sendMessage({ text: textInput });
    setTextInput('');
    setShowEmojiPicker(false);
  };

  const handleSendSampleImage = (url) => {
    sendMessage({
      type: 'image',
      mediaUrl: url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      caption: 'Sample Shared Photo 📸'
    });
    setShowAttachmentMenu(false);
  };

  const handleSendVoiceNote = () => {
    const mins = Math.floor(recordingTime / 60);
    const secs = recordingTime % 60;
    const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    sendMessage({
      type: 'audio',
      audioDuration: formattedDuration || '0:08'
    });
    setIsRecording(false);
  };

  const filteredMessages = inChatSearchQuery.trim()
    ? activeMessages.filter(m => m.text?.toLowerCase().includes(inChatSearchQuery.toLowerCase()))
    : activeMessages;

  if (!activeContact) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#222e35] border-b-[6px] border-[#00a884] select-none text-center p-8">
        <div className="max-w-md flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-emerald-100 dark:bg-[#111b21] flex items-center justify-center mb-6 text-[#00a884]">
            <Lock className="w-16 h-16 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl font-light text-gray-800 dark:text-[#e9edef] mb-3">
            WhatsApp Web
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#8696a0] leading-relaxed mb-6">
            Send and receive messages without keeping your phone online.<br />
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
          <div className="flex items-center text-xs text-gray-400 dark:text-[#8696a0] space-x-1">
            <Lock className="w-3.5 h-3.5" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // Determine Wallpaper Background Class / Color
  const getWallpaperStyle = () => {
    if (wallpaper === 'solid_dark') return { backgroundColor: '#0b141a' };
    if (wallpaper === 'solid_green') return { backgroundColor: '#051d18' };
    if (wallpaper === 'solid_blue') return { backgroundColor: '#0a192f' };
    if (wallpaper === 'solid_burgundy') return { backgroundColor: '#1a0910' };
    if (wallpaper === 'solid_light_beige') return { backgroundColor: '#efeae2' };
    return {};
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#efeae2] dark:bg-[#0b141a] relative overflow-hidden select-none">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-[#222d34] z-10">
        <div
          onClick={() => setActiveDrawer('contact_info')}
          className="flex items-center space-x-3 cursor-pointer hover:opacity-90"
        >
          <img
            src={activeContact.avatar}
            alt={activeContact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-[#e9edef]">
              {activeContact.name}
            </h2>
            <p className="text-xs text-[#667781] dark:text-[#8696a0]">
              {activeContact.lastSeen === 'online' ? (
                <span className="text-[#00a884] font-medium">online</span>
              ) : (
                activeContact.lastSeen
              )}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-1 text-[#54656f] dark:text-[#aebac1]">
          <button
            onClick={() => setActiveCall({ type: 'video', contact: activeContact })}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
            title="Video Call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveCall({ type: 'audio', contact: activeContact })}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
            title="Voice Call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowChatSearch(!showChatSearch)}
            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors ${
              showChatSearch ? 'text-[#00a884]' : ''
            }`}
            title="Search in Chat"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveDrawer('contact_info')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#374248] transition-colors"
            title="Contact Info"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* In-Chat Search Bar Toggle */}
      {showChatSearch && (
        <div className="flex items-center px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-gray-200 dark:border-[#222d34] z-10 text-sm">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search messages in this chat..."
            value={inChatSearchQuery}
            onChange={(e) => setInChatSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-gray-900 dark:text-[#d1d7db] placeholder-gray-500 focus:outline-none"
          />
          <button onClick={() => { setShowChatSearch(false); setInChatSearchQuery(''); }} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Message List */}
      <div
        style={getWallpaperStyle()}
        className={`flex-1 overflow-y-auto p-4 space-y-3 ${
          wallpaper === 'default' ? 'bg-whatsapp-doodle-light dark:bg-whatsapp-doodle-dark' : ''
        }`}
      >
        {/* Security Encryption Banner */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#ffeecd] dark:bg-[#182229] border border-[#ffeb3b]/20 text-[#54656f] dark:text-[#ffeecd] text-[11px] px-3 py-1.5 rounded-lg shadow-sm max-w-md text-center flex items-center justify-center space-x-1.5">
            <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span>Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
          </div>
        </div>

        {filteredMessages.map((msg) => {
          const isMe = msg.senderId === userProfile.id;

          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="bg-white/80 dark:bg-[#182229]/80 text-[#54656f] dark:text-[#8696a0] text-xs px-3 py-1 rounded-md shadow-sm">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'} group relative`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-1.5 shadow-sm relative text-sm ${
                  isMe
                    ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-gray-900 dark:text-[#e9edef] rounded-tr-none'
                    : 'bg-white dark:bg-[#202c33] text-gray-900 dark:text-[#e9edef] rounded-tl-none'
                }`}
              >
                {/* Group Sender Name */}
                {activeContact.isGroup && !isMe && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-0.5">
                    {msg.senderName}
                  </p>
                )}

                {/* Media Image Attachment */}
                {msg.type === 'image' && (
                  <div className="mb-1 rounded-md overflow-hidden max-w-sm">
                    <img src={msg.mediaUrl} alt="Attachment" className="w-full h-auto object-cover max-h-60 rounded-md" />
                    {msg.caption && <p className="mt-1 text-sm">{msg.caption}</p>}
                  </div>
                )}

                {/* Audio Voice Note Player */}
                {msg.type === 'audio' && (
                  <div className="flex items-center space-x-3 py-1 pr-2 min-w-[200px]">
                    <button
                      onClick={() => setActiveAudioPlaying(activeAudioPlaying === msg.id ? null : msg.id)}
                      className="p-2 rounded-full bg-[#00a884] text-white hover:bg-emerald-600 transition-colors"
                    >
                      {activeAudioPlaying === msg.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1.5 bg-gray-300 dark:bg-[#374248] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-[#00a884] transition-all duration-300 ${
                            activeAudioPlaying === msg.id ? 'w-2/3' : 'w-0'
                          }`}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-[#8696a0] mt-1">
                        <span>AUDIO NOTE</span>
                        <span>{msg.audioDuration || '0:12'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Text Message */}
                {msg.type === 'text' && (
                  <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                )}

                {/* Reactions list */}
                {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1 -mb-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <span
                        key={emoji}
                        onClick={() => toggleReaction(activeChatId, msg.id, emoji)}
                        className="bg-gray-100 dark:bg-[#111b21] px-1.5 py-0.5 rounded-full text-xs shadow-sm cursor-pointer hover:scale-105 transition-transform"
                      >
                        {emoji} {count > 1 && <span className="text-[10px] font-bold text-gray-500">{count}</span>}
                      </span>
                    ))}
                  </div>
                )}

                {/* Time & Read Status Indicator */}
                <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-gray-500 dark:text-[#8696a0] float-right ml-2">
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      ) : msg.status === 'delivered' ? (
                        <CheckCheck className="w-3.5 h-3.5 text-gray-400 dark:text-[#8696a0]" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-gray-400 dark:text-[#8696a0]" />
                      )}
                    </span>
                  )}
                </div>

                {/* Message Context Action Dropdown */}
                <button
                  onClick={() => setActiveMessageMenu(activeMessageMenu === msg.id ? null : msg.id)}
                  className="absolute top-1 right-1 p-0.5 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMessageMenu === msg.id && (
                  <div className="absolute right-0 top-6 bg-white dark:bg-[#233138] rounded-md shadow-lg border border-gray-200 dark:border-[#222d34] py-1 z-30 text-xs w-36">
                    <div className="px-2 py-1.5 border-b border-gray-100 dark:border-[#222d34] flex justify-between">
                      {['👍', '❤️', '😂', '🔥', '🎉'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            toggleReaction(activeChatId, msg.id, emoji);
                            setActiveMessageMenu(null);
                          }}
                          className="hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        deleteMessage(activeChatId, msg.id);
                        setActiveMessageMenu(null);
                      }}
                      className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-[#182229] flex items-center space-x-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete message</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 bg-white dark:bg-[#202c33] border border-gray-200 dark:border-[#222d34] rounded-lg shadow-xl p-3 z-30 grid grid-cols-8 gap-2 w-72">
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setTextInput(prev => prev + emoji)}
              className="text-xl hover:bg-gray-100 dark:hover:bg-[#2a3942] p-1.5 rounded transition-transform hover:scale-110"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Attachment Options Popover */}
      {showAttachmentMenu && (
        <div className="absolute bottom-16 left-12 bg-white dark:bg-[#233138] border border-gray-200 dark:border-[#222d34] rounded-lg shadow-xl p-2 z-30 space-y-1 text-sm text-gray-800 dark:text-[#d1d7db]">
          <button
            onClick={() => handleSendSampleImage('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80')}
            className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#182229] rounded-md"
          >
            <ImageIcon className="w-5 h-5 text-purple-500" />
            <span>Photos & Videos</span>
          </button>
        </div>
      )}

      {/* Message Input Footer Bar */}
      <div className="px-4 py-2.5 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-[#222d34] flex items-center space-x-2 z-10">
        {isRecording ? (
          <div className="flex-1 flex items-center justify-between bg-white dark:bg-[#2a3942] px-4 py-2 rounded-lg text-sm">
            <div className="flex items-center space-x-2 text-red-500">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              <span className="font-mono">Recording {recordingTime}s</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsRecording(false)}
                className="text-gray-500 hover:text-red-500"
                title="Cancel Recording"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendVoiceNote}
                className="bg-[#00a884] text-white p-1.5 rounded-full hover:bg-emerald-600"
                title="Send Voice Note"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowAttachmentMenu(false); }}
              className="p-2 text-[#54656f] dark:text-[#8696a0] hover:text-gray-700 dark:hover:text-[#e9edef] rounded-full transition-colors"
              title="Emoji"
            >
              <Smile className="w-6 h-6" />
            </button>

            <button
              onClick={() => { setShowAttachmentMenu(!showAttachmentMenu); setShowEmojiPicker(false); }}
              className="p-2 text-[#54656f] dark:text-[#8696a0] hover:text-gray-700 dark:hover:text-[#e9edef] rounded-full transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-6 h-6" />
            </button>

            <form onSubmit={handleSendText} className="flex-1 flex items-center">
              <input
                type="text"
                aria-label="Type a message"
                placeholder="Type a message"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full bg-white dark:bg-[#2a3942] text-gray-900 dark:text-[#e9edef] placeholder-[#54656f] dark:placeholder-[#8696a0] px-4 py-2 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a884]"
              />
            </form>

            {textInput.trim() ? (
              <button
                onClick={handleSendText}
                className="p-2.5 bg-[#00a884] text-white rounded-full hover:bg-emerald-600 transition-colors shadow-sm"
                title="Send Message"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsRecording(true)}
                className="p-2 text-[#54656f] dark:text-[#8696a0] hover:text-gray-700 dark:hover:text-[#e9edef] rounded-full transition-colors"
                title="Voice Recording"
              >
                <Mic className="w-6 h-6" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
