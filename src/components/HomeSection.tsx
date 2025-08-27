import { Song, Playlist } from '@/types/music';
import { SongCard } from './SongCard';
import { PlaylistCard } from './PlaylistCard';

interface HomeSectionProps {
  trendingSongs: Song[];
  featuredPlaylists: Playlist[];
  recentlyPlayed: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onPauseSong: () => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const HomeSection = ({ 
  trendingSongs, 
  featuredPlaylists, 
  recentlyPlayed,
  currentSong,
  isPlaying,
  onPlaySong,
  onPauseSong,
  onPlayPlaylist
}: HomeSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-music-gradient p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Sound
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            Explore millions of songs, create playlists, and enjoy your favorite music anytime, anywhere.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {recentlyPlayed.slice(0, 6).map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={currentSong?.id === song.id && isPlaying}
                onPlay={onPlaySong}
                onPause={onPauseSong}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending Now */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={currentSong?.id === song.id && isPlaying}
              onPlay={onPlaySong}
              onPause={onPauseSong}
            />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlay={onPlayPlaylist}
              onPause={onPauseSong}
            />
          ))}
        </div>
      </section>
    </div>
  );
};