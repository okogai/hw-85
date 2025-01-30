import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl, SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchArtists } from '../../store/thunks/artistThunk.ts';
import { useNavigate } from "react-router-dom";
import { selectTracksLoading } from '../../store/slices/trackSlice.ts';
import { selectArtists } from '../../store/slices/artistSlice.ts';
import { selectAlbums } from '../../store/slices/albumSlice.ts';
import { TrackMutation } from '../../typed';
import { fetchAlbums } from '../../store/thunks/albumThunk.ts';
import { addTrack } from '../../store/thunks/trackThunk.ts';

const initialState = {
  trackNumber: 0,
  title: '',
  duration: '',
  album: '',
  youtubeLink: ''
};

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectTracksLoading);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const [form, setForm] = useState<TrackMutation>(initialState);
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleArtistChange = (e: SelectChangeEvent) => {
    const artistId = e.target.value;
    setSelectedArtist(artistId);
    dispatch(fetchAlbums(artistId));
  };

  const handleChange = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.album) {
      alert("Please select an album.");
      return;
    }

    await dispatch(addTrack(form));
    navigate("/");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom textAlign='center' textTransform='uppercase'>
        Add New Track
      </Typography>

      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel>Artist</InputLabel>
        <Select
          label="Artist"
          value={selectedArtist}
          variant="outlined"
          onChange={handleArtistChange}
          required
        >
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel>Album</InputLabel>
        <Select
          label="Album"
          name="album"
          value={form.album}
          onChange={handleChange}
          required
        >
          {albums.map((album) => (
            <MenuItem key={album._id} value={album._id}>
              {album.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Track Number"
        name="trackNumber"
        type="number"
        value={form.trackNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Duration"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        required
      />
      <TextField
        label="YouTube Link"
        name="youtubeLink"
        value={form.youtubeLink}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'center' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Add Track'}
      </Button>
    </Box>
  );
};

export default TrackForm;
