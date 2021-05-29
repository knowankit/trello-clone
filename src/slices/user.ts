import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import shortId from 'shortid';
import { UserDetail } from '@/src/types/user';

const initialState: UserDetail = {
  id: '',
  status: 'idle',
  email: '',
  password: '',
  confirmPassword: '',
  isValid: false,
  isCreating: false,
  isFetching: false,
  doneFetching: true,
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
    confirmPassword: user.confirmPassword
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

  const response = await fetch(`${host}/api/login/${user.id}`);
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
      state.message = payload && payload.message;
    },
    [registerUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.isCreating = false;
      state.message = payload && payload.message;
    },
    [registerUser.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.isCreating = false;
      state.message = payload && payload.message;
    },
    [loginUser.pending.toString()]: (state, { payload }) => {
      state.status = 'pending';
      state.doneFetching = false;
      state.message = payload && payload.message;
    },
    [loginUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.error = (payload && payload.error) || '';
      state.doneFetching = true;
      state.message = payload && payload.message;
    },
    [loginUser.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.doneFetching = true;
      state.error = (payload && payload.error) || '';
      state.message = payload && payload.message;
    },
    [fetchUser.pending.toString()]: (state, { payload }) => {
      state.status = 'pending';
      state.doneFetching = false;
      state.message = payload && payload.message;
    },
    [fetchUser.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.error = payload && payload.error;
      state.doneFetching = true;
      state.id = payload && payload.id;
      state.message = payload && payload.message;
      state.email = payload && payload.email;
    },
    [fetchUser.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.doneFetching = true;
      state.error = payload && payload.error;
      state.message = payload && payload.message;
    }
  }
});

export const { updateUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
