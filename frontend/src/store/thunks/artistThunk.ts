import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation, GlobalError } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artist[]>('artists/fetchArtists', async () => {
  const response = await axiosAPI.get('/artists');
  return response.data;
});

export const deleteArtist = createAsyncThunk<void, string, { rejectValue: GlobalError }>('artists/deleteArtist',
  async (id: string, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`artists/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const addArtist = createAsyncThunk<Artist, ArtistMutation, { rejectValue: GlobalError }>('artists/addArtist',
  async (data: ArtistMutation, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("info", data.info);
  formData.append("creator", data.creator);
  if (data.photo) {
    formData.append("photo", data.photo);
  }

  try {
    const response = await axiosAPI.post("/artists", formData);

    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const publishArtist = createAsyncThunk<void, string>('artists/publishArtist',
  async (id: string) => {
    await axiosAPI.patch(`artists/${id}/togglePublished`);
  });