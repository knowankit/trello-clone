import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import { SingleUser } from '@/src/types/user';
import { ColumnsSlice } from '@/src/types/columns';
import findIndex from 'lodash.findindex';

import { BoardSlice } from '@/src/types/boards';

const initialState = {
  columns: [],
  status: 'idle',
  isRequesting: false,
  doneFetching: true,
  error: {}
};

const host = checkEnvironment();

export const fetchColumns = createAsyncThunk('columns/fetchColumns', async (_obj, { getState }) => {
  const { board } = getState() as { board: BoardSlice };

  const response = await fetch(`${host}/api/boards/${board.board._id}/columns`).then((response) =>
    response.json()
  );

  return response;
});

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async (columnId: string, { getState }) => {
    const { board } = getState() as { board: BoardSlice };

    const url = `${host}/api/boards/${board.board._id}/columns/${columnId}`;

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

export const addColumnToBoard = createAsyncThunk(
  'column/add',
  async (columnId: string, { getState }) => {
    const { board } = getState() as { board: BoardSlice };
    const { user } = getState() as { user: SingleUser };
    const { columns } = getState() as { columns: ColumnsSlice };

    const columsArray = columns.columns;
    let sequence = 1;

    if (columns.columns.length > 0) {
      sequence = columsArray[columsArray.length - 1].sequence + 1;
    }

    const data = {
      id: columnId,
      boardId: board.board._id,
      columnName: 'Add title',
      dateCreated: new Date().toLocaleString(),
      userId: user.id,
      sequence
    };

    const url = `${host}/api/boards/${data.boardId}/columns`;

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
  }
);

export const updateColumn = createAsyncThunk(
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

export const updateColumnSequence = createAsyncThunk(
  'card/updateCardSequence',
  async (obj: { _id: string; sequence: number }, { getState }) => {
    const { board } = getState() as { board: BoardSlice };
    const { _id, sequence } = obj;

    const data = {
      _id,
      sequence
    };

    const url = `${host}/api/boards/${board.board._id}/columns/${_id}`;

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

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: initialState,
  reducers: {
    resetColumns: () => initialState,
    updateColumnSequenceToLocalState: (state, { payload }) => {
      const columnIndex = findIndex(state.columns, { _id: payload._id });
      state.columns[columnIndex].sequence = payload.sequence;
    }
  },
  extraReducers: {
    [addColumnToBoard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [addColumnToBoard.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [addColumnToBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [fetchColumns.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [fetchColumns.fulfilled.toString()]: (state, { payload }) => {
      const sortedColumns = payload.sort((a, b) => a.sequence - b.sequence);

      state.columns = sortedColumns;
      state.status = 'success';
      state.isRequesting = false;
    },
    [fetchColumns.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [deleteColumn.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [deleteColumn.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [deleteColumn.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [updateColumn.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [updateColumn.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [updateColumn.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    }
  }
});

export const { resetColumns, updateColumnSequenceToLocalState } = columnsSlice.actions;

export default columnsSlice.reducer;
