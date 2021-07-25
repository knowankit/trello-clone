import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { BoardSlice } from '@/src/types/boards';

const initialState = {
  users: [],
  fetching: false,
  status: 'idle',
  error: ''
};

const host = checkEnvironment();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };
  let users = board.board.users;
  const createdBy = board.board.createdBy;

  users = [...users, createdBy];

  let userPromise = [];
  for (let i = 0; i < users.length; i++) {
    userPromise.push(fetch(`${host}/api/users/${users[i]}`));
  }

  userPromise = await Promise.all(userPromise);
  const jsonPromise = [];

  for (let i = 0; i < userPromise.length; i++) {
    const json = userPromise[i].json();
    jsonPromise.push(json);
  }

  const usersData = await Promise.all(jsonPromise);

  return usersData;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsersData: () => initialState
  },
  extraReducers: {
    [fetchUsers.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [fetchUsers.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.users = payload;
    },
    [fetchUsers.rejected.toString()]: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload && payload.error;
    }
  }
});

export const { resetUsersData } = usersSlice.actions;

export default usersSlice.reducer;
