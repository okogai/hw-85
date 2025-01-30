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
import { NavLink, useNavigate } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice.ts";
import { selectAlbumsLoading } from '../../store/slices/albumSlice.ts';
import { addAlbum } from '../../store/thunks/albumThunk.ts';
import { fetchArtists } from '../../store/thunks/artistThunk.ts';
import FileInput from '../UI/FileInput/FileInput.tsx';
import { selectArtists } from '../../store/slices/artistSlice.ts';

const initialState = {
  title: "",
  year: "",
  cover: null,
  artist: "",
};

const AlbumForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAlbumsLoading);
  const artists = useAppSelector(selectArtists);

  const [filename, setFilename] = useState("");
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setFilename(files[0].name);
    }
  };

  const handleChange = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.cover) {
      alert("Please select a cover image.");
      return;
    }

    await dispatch(addAlbum(form));
    navigate("/");
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          You need to be logged in to add an album.
        </Typography>
        <NavLink to="/login">Go to Login</NavLink>
      </Box>
    );
  }

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
        Add New Album
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Year"
        name="year"
        type="number"
        value={form.year}
        onChange={handleChange}
        required
      />
      <FormControl required sx={{ minWidth: 120 }}>
        <InputLabel>Artist</InputLabel>
        <Select
          variant="outlined"
          label="Artist"
          name="artist"
          value={form.artist}
          onChange={handleChange}
        >
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FileInput
        label="Cover"
        name="cover"
        filename={filename}
        onChange={fileInputChangeHandler}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'center' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Add Album'}
      </Button>
    </Box>
  );
};

export default AlbumForm;
