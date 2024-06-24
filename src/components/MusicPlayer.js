import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [audio] = useState(new Audio(currentTrack.url));
  const [showMusicList, setShowMusicList] = useState(false);

  useEffect(() => {
    audio.loop = true;
  }, [audio]);

  useEffect(() => {
    audio.src = currentTrack.url;
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack, audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (track) => {
    setCurrentTrack(track);
    setShowMusicList(false);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button onClick={() => setShowMusicList(!showMusicList)} className="metal-button p-2 rounded-full">
            <Music size={24} />
          </button>
          {showMusicList && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-metal-black border border-metal-silver rounded-md shadow-lg">
              {tracks.map((track, index) => (
                <button 
                  key={index}
                  onClick={() => changeTrack(track)}
                  className="block w-full text-left px-4 py-2 text-metal-silver hover:bg-metal-gray"
                >
                  {track.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={toggleAudio} className="metal-button p-2 rounded-full">
          {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;