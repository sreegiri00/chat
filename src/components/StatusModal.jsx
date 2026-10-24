import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Plus, Image as ImageIcon } from 'lucide-react';
import { useChat } from '../context/ChatContext';

export default function StatusModal() {
  const { activeStatusViewer, setActiveStatusViewer, addStatusStory } = useChat();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [newStoryUrl, setNewStoryUrl] = useState('');
  const [newStoryCaption, setNewStoryCaption] = useState('');

  const stories = activeStatusViewer?.stories || [];
  const currentStory = stories[currentStoryIndex];

  // Auto advance story progress timer
  useEffect(() => {
    if (!activeStatusViewer || stories.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentStoryIndex(prev => {
        if (prev < stories.length - 1) {
          return prev + 1;
        } else {
          setActiveStatusViewer(null);
          return 0;
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [activeStatusViewer, currentStoryIndex, isPaused, stories.length]);

  if (!activeStatusViewer) return null;

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      setActiveStatusViewer(null);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  };

  const handleAddStorySubmit = (e) => {
    e.preventDefault();
    if (!newStoryUrl.trim()) return;
    addStatusStory(newStoryUrl, newStoryCaption);
    setShowAddStoryModal(false);
    setNewStoryUrl('');
    setNewStoryCaption('');
    setActiveStatusViewer(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center select-none">
      {/* Close Button */}
      <button
        onClick={() => setActiveStatusViewer(null)}
        aria-label="Close status viewer"
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50 rounded-full bg-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Story Container */}
      <div className="relative w-full max-w-md h-[85vh] bg-black rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl">
        {/* Progress Bars Header */}
        <div className="p-4 bg-gradient-to-b from-black/80 to-transparent z-10 space-y-3">
          <div className="flex space-x-1.5">
            {stories.length > 0 ? (
              stories.map((s, idx) => (
                <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      idx < currentStoryIndex ? 'w-full' : idx === currentStoryIndex ? 'w-full animate-pulse' : 'w-0'
                    }`}
                  ></div>
                </div>
              ))
            ) : (
              <div className="h-1 w-full bg-white/30 rounded-full"></div>
            )}
          </div>

          {/* User Info Header */}
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <img
                src={activeStatusViewer.userAvatar}
                alt={activeStatusViewer.userName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <h3 className="font-semibold text-sm">{activeStatusViewer.userName}</h3>
                <p className="text-xs text-gray-300">{currentStory?.timestamp || activeStatusViewer.updatedAt}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {activeStatusViewer.isSelf && (
                <button
                  onClick={() => setShowAddStoryModal(true)}
                  className="bg-[#00a884] text-white p-1.5 rounded-full hover:bg-emerald-600 transition-colors flex items-center space-x-1 text-xs px-2.5 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Story</span>
                </button>
              )}

              {stories.length > 0 && (
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  aria-label={isPaused ? "Play story" : "Pause story"}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Story Body View */}
        <div className="flex-1 relative flex items-center justify-center bg-black">
          {stories.length > 0 && currentStory ? (
            <>
              <img
                src={currentStory.url}
                alt="Story"
                className="max-h-full max-w-full object-contain"
              />
              {/* Caption Overlay */}
              {currentStory.caption && (
                <div className="absolute bottom-6 inset-x-0 p-4 bg-black/60 backdrop-blur-sm text-white text-center text-sm font-medium">
                  {currentStory.caption}
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8 text-white space-y-4">
              <p className="text-sm text-gray-400">No status stories available yet.</p>
              {activeStatusViewer.isSelf && (
                <button
                  onClick={() => setShowAddStoryModal(true)}
                  className="bg-[#00a884] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Post First Story
                </button>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          {stories.length > 1 && (
            <>
              {currentStoryIndex > 0 && (
                <button
                  onClick={handlePrevStory}
                  aria-label="Previous story"
                  className="absolute left-2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {currentStoryIndex < stories.length - 1 && (
                <button
                  onClick={handleNextStory}
                  aria-label="Next story"
                  className="absolute right-2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add New Story Modal Overlay */}
      {showAddStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#202c33] text-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold">Post New Status Update</h3>
            <form onSubmit={handleAddStorySubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#00a884] font-medium block mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                  value={newStoryUrl}
                  onChange={(e) => setNewStoryUrl(e.target.value)}
                  className="w-full bg-[#111b21] px-3 py-2 rounded text-sm text-white focus:outline-none border border-gray-700"
                />
              </div>

              <div>
                <label className="text-xs text-[#00a884] font-medium block mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="Add a caption..."
                  value={newStoryCaption}
                  onChange={(e) => setNewStoryCaption(e.target.value)}
                  className="w-full bg-[#111b21] px-3 py-2 rounded text-sm text-white focus:outline-none border border-gray-700"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStoryModal(false)}
                  className="px-4 py-2 rounded text-xs hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00a884] px-4 py-2 rounded text-xs font-semibold hover:bg-emerald-600"
                >
                  Post Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
