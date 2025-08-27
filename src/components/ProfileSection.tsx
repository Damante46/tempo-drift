import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, LogOut, Music, Heart, ListMusic } from 'lucide-react';

interface ProfileSectionProps {
  userPlaylists: any[];
  likedSongs: any[];
}

export const ProfileSection = ({ userPlaylists, likedSongs }: ProfileSectionProps) => {
  const handleLogin = () => {
    // This will be implemented with Supabase
    console.log('Login functionality requires Supabase integration');
  };

  const handleSignup = () => {
    // This will be implemented with Supabase
    console.log('Signup functionality requires Supabase integration');
  };

  // Mock user for demonstration
  const isLoggedIn = false;
  const user = null;

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
            
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                To enable authentication and user features, connect your project to Supabase.
              </p>
            </div>
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
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">Music Lover</p>
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
            <p className="text-3xl font-bold">{userPlaylists.length}</p>
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
            <p className="text-3xl font-bold">{likedSongs.length}</p>
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
        <Button variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};