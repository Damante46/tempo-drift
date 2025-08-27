import { useState } from 'react';
import { Song, Playlist } from '@/types/music';
import { SongCard } from './SongCard';
import { PlaylistCard } from './PlaylistCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Heart } from 'lucide-react';

interface LibrarySectionProps {
  userPlaylists: Playlist[];
  likedSongs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onPauseSong: () => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  onCreatePlaylist: () => void;
}

export const LibrarySection = ({ 
  userPlaylists,
  likedSongs,
  currentSong,
  isPlaying,
  onPlaySong,
  onPauseSong,
  onPlayPlaylist,
  onCreatePlaylist
}: LibrarySectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <Button onClick={onCreatePlaylist} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists" className="mt-6">
          {userPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPlay={onPlayPlaylist}
                  onPause={onPauseSong}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
              <p className="text-muted-foreground mb-6">Create your first playlist to get started</p>
              <Button onClick={onCreatePlaylist} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Playlist
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="liked" className="mt-6">
          {likedSongs.length > 0 ? (
            <div className="space-y-2">
              {likedSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  variant="compact"
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={onPlaySong}
                  onPause={onPauseSong}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No liked songs yet</h3>
              <p className="text-muted-foreground">Start liking songs to see them here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};