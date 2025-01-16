import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { Album } from '../../typed';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchArtistAlbums',
  async (artistId: string) => {
    const response = await axiosAPI.get(`/albums?artist=${artistId}`);
    return response.data;
  }
);
