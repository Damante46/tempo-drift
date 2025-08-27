import { useState } from 'react';
import { Song, Playlist } from '@/types/music';
import { SearchBar } from './SearchBar';
import { SongCard } from './SongCard';
import { PlaylistCard } from './PlaylistCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchSectionProps {
  allSongs: Song[];
  allPlaylists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onPauseSong: () => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const SearchSection = ({ 
  allSongs, 
  allPlaylists,
  currentSong,
  isPlaying,
  onPlaySong,
  onPauseSong,
  onPlayPlaylist
}: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = allPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const genres = [...new Set(allSongs.map(song => song.genre).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Search</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {!searchQuery ? (
        // Browse by Genre
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <div
                key={genre}
                className="bg-music-gradient rounded-lg p-6 cursor-pointer hover:scale-105 transition-smooth"
              >
                <h3 className="font-bold text-white text-lg">{genre}</h3>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Popular Right Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allSongs.slice(0, 8).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={onPlaySong}
                  onPause={onPauseSong}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Search Results
        <Tabs defaultValue="songs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="songs">Songs ({filteredSongs.length})</TabsTrigger>
            <TabsTrigger value="playlists">Playlists ({filteredPlaylists.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="songs" className="mt-6">
            {filteredSongs.length > 0 ? (
              <div className="space-y-2">
                {filteredSongs.map((song) => (
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
              <p className="text-center text-muted-foreground py-8">No songs found for "{searchQuery}"</p>
            )}
          </TabsContent>
          
          <TabsContent value="playlists" className="mt-6">
            {filteredPlaylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onPlay={onPlayPlaylist}
                    onPause={onPauseSong}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No playlists found for "{searchQuery}"</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};