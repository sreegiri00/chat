import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';
import { useChat } from '../context/ChatContext';

export default function CallModal() {
  const { activeCall, setActiveCall } = useChat();

  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    if (!activeCall) return;

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      setCallDuration(0);
    };
  }, [activeCall]);

  if (!activeCall) return null;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isVideoCall = activeCall.type === 'video';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-lg bg-[#202c33] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-between min-h-[480px] p-6 relative border border-gray-700">
        {/* Call Info Header */}
        <div className="flex flex-col items-center space-y-1 text-center z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            {isVideoCall ? 'WhatsApp Video Call' : 'WhatsApp Voice Call'}
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">{activeCall.contact.name}</h2>
          <p className="text-sm font-mono text-gray-300">{formatDuration(callDuration)}</p>
        </div>

        {/* Video / Avatar Center Area */}
        <div className="my-6 relative flex items-center justify-center w-full flex-1">
          {isVideoCall && isVideoOn ? (
            <div className="relative w-full h-64 bg-gray-900 rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center">
              <img
                src={activeCall.contact.avatar}
                alt={activeCall.contact.name}
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute bottom-3 right-3 w-24 h-32 bg-gray-800 border-2 border-white rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="My Camera"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={activeCall.contact.avatar}
                alt={activeCall.contact.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-emerald-500/50 shadow-2xl"
              />
              <span className="absolute inset-0 rounded-full animate-ping ring-2 ring-emerald-400 opacity-25"></span>
            </div>
          )}
        </div>

        {/* Controls Footer */}
        <div className="flex items-center space-x-6 z-10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-colors ${
              isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {isVideoCall && (
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-colors ${
                !isVideoOn ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              title={isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
            >
              {!isVideoOn ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>
          )}

          <button
            onClick={() => setActiveCall(null)}
            className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
