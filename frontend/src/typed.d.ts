export interface Artist {
  _id: string;
  name: string;
  photo: string;
}

interface Track {
  _id: string;
  trackNumber: number;
  title: string;
  duration: string;
  album: Album;
  youtubeLink: string;
}

interface Album {
  _id: string;
  title: string;
  year: number;
  cover: string;
  artist: Artist
  trackCount: number;
}

export interface User {
  username: string;
  _id: string;
  token: string;
  role: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
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
    }
  },
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
      }
    }
  };
  datetime: string;
}
