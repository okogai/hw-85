import { createSlice } from '@reduxjs/toolkit';
import { register } from '../thunks/userThunk.ts';
import { RootState } from '../../app/store.ts';
import { User, ValidationError } from '../../typed';

interface UsersState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
}

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    })
    builder.addCase(register.fulfilled, (state, {payload: RegisterResponse}) => {
      state.registerLoading = false;
      state.user = RegisterResponse.user;
      state.registerError = null;
    })
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;