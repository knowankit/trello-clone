import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { SingleUser } from '@/src/types/user';
import { CardSlice } from '@/src/types/cards';

import { BoardSlice } from '@/src/types/boards';
import shortId from 'shortid';
import findIndex from 'lodash.findindex';

type CardPatch = {
  _id: string;
  title?: string;
  description?: string;
  columnId?: string;
  assignedTo?: string;
  sequence?: number;
};

const initialState = {
  cards: [],
  status: 'idle',
  isRequesting: false,
  isDeleting: false,
  doneFetching: true,
  error: {}
};

const host = checkEnvironment();

export const fetchCards = createAsyncThunk('cards/fetchCards', async (_obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };
  const url = `${host}/api/boards/${board.board._id}/cards`;
  const response = await fetch(url).then((response) => response.json());

  return response;
});

export const deleteCard = createAsyncThunk(
  'card/deleteCard',
  async (cardId: string, { getState }) => {
    const { board } = getState() as { board: BoardSlice };

    const url = `${host}/api/boards/${board.board._id}/cards/${cardId}`;

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
  const { cards } = getState() as { cards: CardSlice };

  const filteredCards = cards.cards.filter((card) => card.columnId === columnId);

  let sequence = 1;

  if (filteredCards.length > 0) {
    sequence = filteredCards[filteredCards.length - 1].sequence + 1;
  }

  const cardId = shortId.generate();

  const data = {
    id: cardId,
    columnId: columnId,
    boardId: board.board._id,
    title: 'Add title',
    type: '',
    description: '',
    dateCreated: new Date().toLocaleString(),
    userId: user.id,
    assignedTo: '',
    sequence
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
  'card/updateCard',
  async (obj: CardPatch, { getState }) => {
    const { board } = getState() as { board: BoardSlice };

    const url = `${host}/api/boards/${board.board._id}/cards/${obj._id}`;

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
      body: JSON.stringify(obj)
    });

    const inJSON = await response.json();

    return inJSON;
  }
);

export const updateCardSequence = createAsyncThunk(
  'card/updateCardSequence',
  async (obj: CardPatch, { getState }) => {
    const { board } = getState() as { board: BoardSlice };
    const { _id, title, description, columnId, sequence } = obj;

    const data = {
      title,
      description,
      columnId,
      sequence
    };

    const url = `${host}/api/boards/${board.board._id}/cards/${_id}`;

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
    resetCards: () => initialState,
    updateCardSequenceToLocalState: (state, { payload }) => {
      const cardIndex = findIndex(state.cards, { _id: payload._id });

      state.cards[cardIndex].sequence = payload.sequence;
      state.cards[cardIndex].columnId = payload.columnId;
    }
  },
  extraReducers: {
    [addCard.pending.toString()]: (state) => {
      state.isRequesting = true;
      state.status = 'pending';
    },
    [addCard.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [addCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [fetchCards.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [fetchCards.fulfilled.toString()]: (state, { payload }) => {
      state.cards = payload;
      state.status = 'success';
      state.isRequesting = false;
    },
    [fetchCards.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [deleteCard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isDeleting = true;
    },
    [deleteCard.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isDeleting = false;
    },
    [deleteCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isDeleting = false;
    },
    [updateCard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [updateCard.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [updateCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [updateCardSequence.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [updateCardSequence.fulfilled.toString()]: (state) => {
      state.status = 'success';
    },
    [updateCardSequence.rejected.toString()]: (state) => {
      state.status = 'failed';
    }
  }
});

export const { resetCards, updateCardSequenceToLocalState } = cardsSlice.actions;

export default cardsSlice.reducer;
