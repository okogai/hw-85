import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const fetchArtists = createAsyncThunk<Artist[]>('artists/fetchArtists', async () => {
  const response = await axiosAPI.get('/artists');
  return response.data;
});