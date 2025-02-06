import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { GlobalError, Track, TrackMutation } from "../../typed";
import { isAxiosError } from "axios";

export const fetchTracks = createAsyncThunk<Track[], string>(
  "tracks/fetchAlbumTracks",
  async (albumId: string) => {
    const response = await axiosAPI.get(`/tracks?album=${albumId}`);
    return response.data;
  },
);

export const deleteTrack = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("tracks/deleteTrack", async (id: string, { rejectWithValue }) => {
  try {
    await axiosAPI.delete(`tracks/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const addTrack = createAsyncThunk<
  Track,
  TrackMutation,
  { rejectValue: GlobalError }
>("tracks/addTrack", async (data: TrackMutation, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post("/tracks", data);

    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const publishTrack = createAsyncThunk<void, string>(
  "tracks/publishTrack",
  async (id: string) => {
    await axiosAPI.patch(`tracks/${id}/togglePublished`);
  },
);
