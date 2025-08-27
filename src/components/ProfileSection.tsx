import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, LogOut, Music, Heart, ListMusic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileSectionProps {
  userPlaylists: any[];
  likedSongs: any[];
}

export const ProfileSection = ({ userPlaylists, likedSongs }: ProfileSectionProps) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [userPlaylistsData, setUserPlaylistsData] = useState<any[]>([]);
  const [likedSongsData, setLikedSongsData] = useState<any[]>([]);

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignup = () => {
    navigate('/auth');
  };

  // Fetch user profile and data when user is logged in
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }

        // Fetch user playlists
        const { data: playlistsData } = await supabase
          .from('playlists')
          .select('*')
          .eq('user_id', user.id);
        
        if (playlistsData) {
          setUserPlaylistsData(playlistsData);
        }

        // Fetch liked songs
        const { data: likedData } = await supabase
          .from('liked_songs')
          .select('*')
          .eq('user_id', user.id);
        
        if (likedData) {
          setLikedSongsData(likedData);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const isLoggedIn = !!user;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome to StreamFlow</h1>
        
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join StreamFlow</CardTitle>
            <p className="text-muted-foreground">
              Create an account to save playlists, like songs, and personalize your experience.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSignup} className="w-full" size="lg">
              Sign Up
            </Button>
            <Button onClick={handleLogin} variant="outline" className="w-full" size="lg">
              Log In
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Music className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Unlimited Music</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Stream millions of songs with high-quality audio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <ListMusic className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Custom Playlists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Create and manage your own personalized playlists.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Favorite Songs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Save your favorite tracks for easy access.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="text-2xl">
            {profile?.display_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">
            {profile?.display_name || profile?.username || 'Music Lover'}
          </h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListMusic className="h-5 w-5" />
              Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userPlaylistsData.length}</p>
            <p className="text-sm text-muted-foreground">Created playlists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Liked Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{likedSongsData.length}</p>
            <p className="text-sm text-muted-foreground">Favorite tracks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Listening Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42h</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="outline" className="gap-2" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};