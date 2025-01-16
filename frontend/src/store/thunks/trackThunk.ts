import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { Track } from '../../typed';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchAlbumTracks',
  async (albumId: string) => {
    const response = await axiosAPI.get(`/tracks?album=${albumId}`);
    return response.data;
  }
);