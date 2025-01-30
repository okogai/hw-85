import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { Album, AlbumMutation, Artist, GlobalError } from '../../typed';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchArtistAlbums',
  async (artistId: string) => {
    const response = await axiosAPI.get(`/albums?artist=${artistId}`);
    return response.data;
  }
);

export const deleteAlbum= createAsyncThunk<void, string, { rejectValue: GlobalError }>('albums/deleteAlbum',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosAPI.delete(`albums/${id}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  });

export const addAlbum = createAsyncThunk<Artist, AlbumMutation, { rejectValue: GlobalError }>('albums/addAlbum',
  async (data: AlbumMutation, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("year", data.year);
    formData.append("artist", data.artist);
    if (data.cover) {
      formData.append("cover", data.cover);
    }

    try {
      const response = await axiosAPI.post("/albums", formData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  });

export const publishAlbum = createAsyncThunk<void, string>('albums/publishAlbum',
  async (id: string) => {
    await axiosAPI.patch(`albums/${id}/togglePublished`);
  });