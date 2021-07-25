import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { UserDetail } from '@/src/types/user';

const initialState: UserDetail = {
  id: '',
  status: 'idle',
  email: '',
  password: '',
  fullName: '',
  confirmPassword: '',
  isValid: false,
  isCreating: false,
  isFetching: false,
  message: '',
  error: ''
};

const host = checkEnvironment();

export const fetchUser = createAsyncThunk('users/fetchUser', async (obj, { getState }) => {
  const { user } = getState() as { user: UserDetail };

  const response = await fetch(`${host}/api/users/${user.id}`);
  const responseInjson = await response.json();

  return responseInjson;
});

export const verifyEmail = createAsyncThunk('verify-email', async (email) => {
  const response = await fetch(`${host}/api/verify-email/?email=${email}`);
  const responseInjson = await response.json();

  return responseInjson;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserData: (state, { payload }) => {
      state[payload.type] = payload.value;
    },
    resetUserData: () => initialState
  },
  extraReducers: {
    [fetchUser.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [fetchUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.id = payload && payload._id;
      state.email = payload && payload.email;
      state.fullName = payload && payload.fullName;
    },
    [fetchUser.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload && payload.error;
      state.message = payload && payload.message;
    },
    [verifyEmail.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [verifyEmail.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.status = payload && payload.status;
      state.message = payload && payload.message;
    },
    [verifyEmail.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.message = payload && payload.message;
    }
  }
});

export const { updateUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
