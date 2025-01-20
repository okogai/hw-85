import React, { useState } from 'react';
import { RegisterMutation } from '../../typed';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectRegisterError } from '../../store/slices/userSlice.ts';
import { register } from '../../store/thunks/userThunk.ts';



const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerError = useAppSelector(selectRegisterError);
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {

    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;