import { Song } from '@/types/music';
import { formatDuration } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';

interface SongCardProps {
  song: Song;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
  variant?: 'default' | 'compact';
}

export const SongCard = ({ song, isPlaying = false, onPlay, onPause, variant = 'default' }: SongCardProps) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(song);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-hover transition-smooth cursor-pointer">
        <div className="relative">
          <img 
            src={song.coverArt} 
            alt={`${song.album} cover`}
            className="w-12 h-12 rounded-md object-cover"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute inset-0 w-12 h-12 rounded-md bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{song.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">{formatDuration(song.duration)}</span>
      </div>
    );
  }

  return (
    <div className="group bg-card/50 backdrop-blur-glass border border-glass rounded-xl p-4 hover:bg-card/70 transition-smooth cursor-pointer shadow-glass">
      <div className="relative mb-4">
        <img 
          src={song.coverArt} 
          alt={`${song.album} cover`}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <Button
          size="lg"
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-smooth shadow-music-glow"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </Button>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        <p className="text-xs text-muted-foreground truncate">{song.album}</p>
      </div>
    </div>
  );
};