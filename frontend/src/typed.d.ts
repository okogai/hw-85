export interface Artist {
  _id: string;
  name: string;
  info: string;
  photo: string;
  isPublished: boolean;
  creator: string;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
}

interface Track {
  _id: string;
  trackNumber: number;
  title: string;
  duration: string;
  album: Album;
  youtubeLink: string;
  isPublished: boolean;
  creator: string;
}

interface TrackMutation {
  trackNumber: number;
  title: string;
  duration: string;
  album: string;
  youtubeLink: string;
}

interface Album {
  _id: string;
  title: string;
  year: number;
  cover: string;
  artist: Artist;
  trackCount: number;
  isPublished: boolean;
  creator: string;
}

export interface AlbumMutation {
  title: string;
  year: string;
  cover: File | null;
  artist: string;
}

export interface User {
  username: string;
  _id: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  track: {
    title: string;
    duration: string;
    album: {
      artist: {
        name: string;
      };
    };
  };
  datetime: string;
}
