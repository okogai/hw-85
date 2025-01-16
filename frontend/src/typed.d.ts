export interface Artist {
  _id: string;
  name: string;
  photo: string;
}

interface Track {
  trackNumber: number;
  title: string;
  duration: string;
}

interface Album {
  _id: string;
  title: string;
  year: number;
  cover: string;
  artist: Artist
}