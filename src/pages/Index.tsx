import { useState } from 'react';
import { Song, Playlist } from '@/types/music';
import { mockSongs, mockPlaylists } from '@/data/mockData';
import { MusicPlayer } from '@/components/MusicPlayer';
import { NavigationBar } from '@/components/NavigationBar';
import { HomeSection } from '@/components/HomeSection';
import { SearchSection } from '@/components/SearchSection';
import { LibrarySection } from '@/components/LibrarySection';
import { ProfileSection } from '@/components/ProfileSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [likedSongs, setLikedSongs] = useState<Song[]>([mockSongs[0], mockSongs[2]]);
  const { toast } = useToast();

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Set current playlist context
    const songIndex = mockSongs.findIndex(s => s.id === song.id);
    setCurrentPlaylist(mockSongs);
    setCurrentIndex(songIndex);
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${song.artist}`,
    });
  };

  const handlePauseSong = () => {
    setIsPlaying(false);
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      setCurrentPlaylist(playlist.songs);
      setCurrentIndex(0);
      setCurrentSong(playlist.songs[0]);
      setIsPlaying(true);
      
      toast({
        title: "Playing Playlist",
        description: playlist.name,
      });
    }
  };

  const handleNext = () => {
    if (currentPlaylist.length > 0) {
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(currentPlaylist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentPlaylist.length > 0) {
      const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(currentPlaylist[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleCreatePlaylist = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Playlist creation will be available after connecting to Supabase for backend functionality.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection
            trendingSongs={mockSongs}
            featuredPlaylists={mockPlaylists}
            recentlyPlayed={likedSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onPauseSong={handlePauseSong}
            onPlayPlaylist={handlePlayPlaylist}
          />
        );
      case 'search':
        return (
          <SearchSection
            allSongs={mockSongs}
            allPlaylists={mockPlaylists}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onPauseSong={handlePauseSong}
            onPlayPlaylist={handlePlayPlaylist}
          />
        );
      case 'library':
        return (
          <LibrarySection
            userPlaylists={userPlaylists}
            likedSongs={likedSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            onPauseSong={handlePauseSong}
            onPlayPlaylist={handlePlayPlaylist}
            onCreatePlaylist={handleCreatePlaylist}
          />
        );
      case 'profile':
        return (
          <ProfileSection
            userPlaylists={userPlaylists}
            likedSongs={likedSongs}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 min-h-screen border-r border-glass">
          <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-screen overflow-y-auto pb-32 md:pb-24">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Index;
