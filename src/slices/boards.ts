import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';

const initialState = {
  boards: [],
  status: 'idle',
  doneFetching: true,
  error: {}
};

const host = checkEnvironment();

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await fetch(`${host}/api/boards`).then((response) => response.json());
  return response;
});

export const boardSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchBoards.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [fetchBoards.fulfilled.toString()]: (state, { payload }) => {
      state.boards = payload;
      state.status = 'success';
    },
    [fetchBoards.rejected.toString()]: (state) => {
      state.status = 'failed';
    }
  }
});

export default boardSlice.reducer;
