import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { BoardSlice } from '@/src/types/boards';

const initialState = {
  board: {
    _id: '',
    name: '',
    columns: [],
    createdBy: '',
    dateCreated: ''
  },
  status: 'idle',
  isLoading: false,
  error: ''
};

const host = checkEnvironment();

export const createBoard = createAsyncThunk('board/create', async (obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };

  const data = {
    _id: board.board._id,
    name: board.board.name,
    dateCreated: board.board.dateCreated,
    createdBy: board.board.createdBy,
    columns: []
  };

  const url = `${host}/api/boards`;

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

export const saveBoard = createAsyncThunk('board/save', async (obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };

  const data = {
    _id: board.board._id,
    name: board.board.name,
    dateCreated: board.board.dateCreated,
    createdBy: board.board.createdBy,
    columns: board.board.columns
  };

  const url = `${host}/api/boards/${data._id}`;

  const response = await fetch(url, {
    method: 'PATCH',
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

export const fetchBoard = createAsyncThunk('board/get', async (slug: string) => {
  const url = `${host}/api/boards/${slug}`;

  const response = await fetch(url);
  const json = await response.json();

  return json;
});

export const deleteBoard = createAsyncThunk('board/delete', async (obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };

  const _id = board.board._id;

  const url = `${host}/api/boards/${_id}`;

  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  const inJSON = await response.json();
  return inJSON;
});

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    updateBoardDetail: (state, { payload }) => {
      state.board[payload.type] = payload.value;
    },
    resetBoard: () => initialState
  },
  extraReducers: {
    [createBoard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [createBoard.fulfilled.toString()]: (state) => {
      state.status = 'success';
    },
    [createBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [fetchBoard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [fetchBoard.fulfilled.toString()]: (state, { payload }) => {
      state.board = payload;
      state.status = 'success';
    },
    [fetchBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [saveBoard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isLoading = true;
    },
    [saveBoard.fulfilled.toString()]: (state, { payload }) => {
      state.board = payload;
      state.isLoading = false;
      state.status = 'success';
    },
    [saveBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isLoading = false;
    },
    [deleteBoard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isLoading = true;
    },
    [deleteBoard.fulfilled.toString()]: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'success';
    },
    [deleteBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isLoading = false;
    }
  }
});

export const { updateBoardDetail, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
