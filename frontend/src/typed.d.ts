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
  album: Album
}

interface Album {
  _id: string;
  title: string;
  year: number;
  cover: string;
  artist: Artist
}