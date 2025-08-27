import { Playlist } from '@/types/music';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface PlaylistCardProps {
  playlist: Playlist;
  isPlaying?: boolean;
  onPlay: (playlist: Playlist) => void;
  onPause: () => void;
}

export const PlaylistCard = ({ playlist, isPlaying = false, onPlay, onPause }: PlaylistCardProps) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(playlist);
    }
  };

  return (
    <div className="group bg-card/50 backdrop-blur-glass border border-glass rounded-xl p-4 hover:bg-card/70 transition-smooth cursor-pointer shadow-glass">
      <div className="relative mb-4">
        <img 
          src={playlist.coverArt} 
          alt={`${playlist.name} cover`}
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
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground truncate">{playlist.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
        <p className="text-xs text-muted-foreground">
          {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};