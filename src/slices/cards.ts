import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { SingleUser } from '@/src/types/user';
import { BoardSlice } from '@/src/types/boards';
import shortId from 'shortid';

const initialState = {
  cards: [],
  status: 'idle',
  doneFetching: true,
  error: {}
};

const host = checkEnvironment();

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (columnId: string, { getState }) => {
    const { board } = getState() as { board: BoardSlice };
    const url = `${host}/api/boards/${board.board._id}/columns/${columnId}/cards`;
    console.log('url', url);
    const response = await fetch(url).then((response) => response.json());

    return response;
  }
);

export const deleteCard = createAsyncThunk(
  'card/deleteCard',
  async (data: { columnId: string; cardId: string }, { getState }) => {
    const columnId = data.columnId;
    const cardId = data.cardId;

    const { board } = getState() as { board: BoardSlice };

    const url = `${host}/api/boards/${board.board._id}/columns/${columnId}/cards/${cardId}`;

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
  }
);

export const deleteAllCards = createAsyncThunk(
  'column/deleteAllColumn',
  async (_obj, { getState }) => {
    const { board } = getState() as { board: BoardSlice };

    const url = `${host}/api/boards/${board.board._id}/columns`;

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
  }
);

export const addCard = createAsyncThunk('card/addCard', async (columnId: string, { getState }) => {
  const { board } = getState() as { board: BoardSlice };
  const { user } = getState() as { user: SingleUser };

  const cardId = shortId.generate();

  const data = {
    id: cardId,
    columnId: columnId,
    boardId: board.board._id,
    title: 'Add title',
    type: '',
    description: '',
    dateCreated: new Date().toLocaleString(),
    userId: user.id
  };

  const url = `${host}/api/boards/${data.boardId}/columns/${columnId}/cards`;

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

export const updateCard = createAsyncThunk(
  'column/updateColumn',
  async (obj: { columnName: string; columnId: string }, { getState }) => {
    const { board } = getState() as { board: BoardSlice };

    const data = {
      _id: obj.columnId,
      boardName: board.board.name,
      columnName: obj.columnName
    };

    const url = `${host}/api/boards/${board.board._id}/columns/${obj.columnId}`;

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
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    resetCards: () => initialState
  },
  extraReducers: {
    [addCard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [addCard.fulfilled.toString()]: (state) => {
      state.status = 'success';
    },
    [addCard.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [fetchCards.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [fetchCards.fulfilled.toString()]: (state, { payload }) => {
      state.cards = payload;
      state.status = 'success';
    },
    [fetchCards.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [deleteCard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [deleteCard.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
    },
    [deleteCard.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [updateCard.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [updateCard.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
    },
    [updateCard.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [deleteAllCards.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [deleteAllCards.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
    },
    [deleteAllCards.rejected.toString()]: (state) => {
      state.status = 'failed';
    }
  }
});

export const { resetCards } = cardsSlice.actions;

export default cardsSlice.reducer;
