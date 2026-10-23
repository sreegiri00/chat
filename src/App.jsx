import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Drawers from './components/Drawers';
import StatusModal from './components/StatusModal';
import CallModal from './components/CallModal';

function MainLayout() {
  return (
    <div className="flex h-screen w-screen bg-[#d1d7db] dark:bg-[#111b21] justify-center items-center overflow-hidden font-sans">
      <div className="flex h-full w-full max-w-[1600px] bg-white dark:bg-[#111b21] shadow-2xl relative overflow-hidden">
        {/* Drawers overlay (Profile, Settings, Contact Info, Wallpaper) */}
        <Drawers />

        {/* Sidebar list */}
        <Sidebar />

        {/* Main Chat Conversation Area */}
        <ChatArea />

        {/* Status Story Viewer Modal */}
        <StatusModal />

        {/* Audio / Video Call Simulation Modal */}
        <CallModal />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <MainLayout />
    </ChatProvider>
  );
}
