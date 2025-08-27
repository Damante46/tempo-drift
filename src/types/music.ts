export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverArt: string;
  audioUrl?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverArt: string;
  songs: Song[];
  createdAt: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}