import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button, CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice.ts";
import { selectArtistsLoading } from '../../store/slices/artistSlice.ts';
import { addArtist } from '../../store/thunks/artistThunk.ts';
import FileInput from '../UI/FileInput/FileInput.tsx';

const initialState = {
  name: "",
  photo: null,
};

const ArtistForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectArtistsLoading);

  const [filename, setFilename] = useState("");
  const [form, setForm] = useState(initialState);

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.photo) {
      alert("Please select an image.");
      return;
    }

    await dispatch(addArtist(form));
    navigate("/");
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          You need to be logged in to add an artist.
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
        Add New Artist
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <FileInput
        label="Photo"
        name="photo"
        filename={filename}
        onChange={fileInputChangeHandler}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{alignSelf: 'center'}}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Add Artist'}

      </Button>
    </Box>
  );
};

export default ArtistForm;
