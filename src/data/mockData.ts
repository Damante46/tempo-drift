import { Song, Playlist } from '@/types/music';
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';
import album4 from '@/assets/album4.jpg';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'Neon Dreams',
    album: 'Electric Nights',
    duration: 245,
    coverArt: album1,
    genre: 'Electronic'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Synthwave Collective',
    album: 'Retro Future',
    duration: 198,
    coverArt: album2,
    genre: 'Synthwave'
  },
  {
    id: '3',
    title: 'Golden Hour',
    artist: 'Ambient Soul',
    album: 'Peaceful Moments',
    duration: 312,
    coverArt: album3,
    genre: 'Ambient'
  },
  {
    id: '4',
    title: 'Dark Matter',
    artist: 'Tech Underground',
    album: 'Industrial Beats',
    duration: 187,
    coverArt: album4,
    genre: 'Techno'
  },
  {
    id: '5',
    title: 'Crystal Dreams',
    artist: 'Neon Dreams',
    album: 'Electric Nights',
    duration: 223,
    coverArt: album1,
    genre: 'Electronic'
  },
  {
    id: '6',
    title: 'Neon Pulse',
    artist: 'Synthwave Collective',
    album: 'Retro Future',
    duration: 267,
    coverArt: album2,
    genre: 'Synthwave'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing and unwinding',
    coverArt: album3,
    songs: [mockSongs[2], mockSongs[4]],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Electronic Beats',
    description: 'High-energy electronic music',
    coverArt: album1,
    songs: [mockSongs[0], mockSongs[4]],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Retro Wave',
    description: '80s-inspired synthwave hits',
    coverArt: album2,
    songs: [mockSongs[1], mockSongs[5]],
    createdAt: '2024-01-20'
  }
];

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};