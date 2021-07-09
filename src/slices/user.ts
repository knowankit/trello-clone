import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import shortId from 'shortid';
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

export const registerUser = createAsyncThunk('user/register', async (obj, { getState }) => {
  const id = shortId.generate();
  const { user } = getState() as { user: UserDetail };

  const data = {
    id: id,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    fullName: user.fullName
  };

  const url = `${host}/api/register`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  const inJSON = await response.json();
  return inJSON;
});

export const loginUser = createAsyncThunk('user/login', async (obj, { getState }) => {
  const { user } = getState() as { user: UserDetail };

  const data = {
    email: user.email,
    password: user.password
  };

  const url = `${host}/api/login`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  const dataInJson = await response.json();

  return dataInJson;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (obj, { getState }) => {
  const { user } = getState() as { user: UserDetail };

  const response = await fetch(`${host}/api/users/${user.id}`);
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
    [registerUser.pending.toString()]: (state, { payload }) => {
      state.status = 'pending';
      state.isCreating = true;
    },
    [registerUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = payload.message;
      state.isCreating = false;
    },
    [registerUser.rejected.toString()]: (state, { payload }) => {
      state.status = payload && payload.message;
      state.isCreating = false;
    },
    [loginUser.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isFetching = true;
    },
    [loginUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.id = payload && payload.id;
      state.password = '';
      state.confirmPassword = '';
      state.error = (payload && payload.error) || '';
      state.isFetching = false;
      state.message = payload && payload.message;
    },
    [loginUser.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.isFetching = false;
      state.error = (payload && payload.error) || '';
      state.message = payload && payload.message;
    },
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
    }
  }
});

export const { updateUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
