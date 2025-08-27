import { useState, useEffect } from 'react';
import { Song } from '@/types/music';
import { formatDuration } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart } from 'lucide-react';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const MusicPlayer = ({ 
  currentSong, 
  isPlaying, 
  onPlay, 
  onPause, 
  onNext, 
  onPrevious 
}: MusicPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'none' | 'one' | 'all'>('none');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            onNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, onNext]);

  useEffect(() => {
    setCurrentTime(0);
  }, [currentSong]);

  if (!currentSong) {
    return null;
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'all', 'one'] as const;
    const currentIndex = modes.indexOf(repeat);
    setRepeat(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-player border-t border-glass backdrop-blur-glass p-4 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6">
          {/* Song Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <img 
              src={currentSong.coverArt} 
              alt={`${currentSong.album} cover`}
              className="w-16 h-16 rounded-lg object-cover shadow-lg"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground truncate">{currentSong.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-3 flex-2 max-w-xl">
            <div className="flex items-center gap-4">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShuffle(!shuffle)}
                className={shuffle ? 'text-primary' : 'text-muted-foreground'}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onPrevious}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={isPlaying ? onPause : onPlay}
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-music-glow"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={onNext}>
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={toggleRepeat}
                className={repeat !== 'none' ? 'text-primary' : 'text-muted-foreground'}
              >
                <Repeat className="h-4 w-4" />
                {repeat === 'one' && <span className="absolute text-xs -top-1 -right-1">1</span>}
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-3 w-full">
              <span className="text-xs text-muted-foreground min-w-[40px]">
                {formatDuration(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground min-w-[40px]">
                {formatDuration(currentSong.duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};