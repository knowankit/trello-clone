import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from '@/src/slices/boards';
import userSlice from '@/src/slices/user';
import boardSlice from '@/src/slices/board';
import columnsSlice from '@/src/slices/columns';
import cardsSlice from '@/src/slices/cards';
import usersSlice from '@/src/slices/users';

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      boards: boardsSlice,
      board: boardSlice,
      user: userSlice,
      columns: columnsSlice,
      cards: cardsSlice,
      users: usersSlice
    },
    preloadedState
  });
};

const store = configureStore({
  reducer: {
    boards: boardsSlice,
    user: userSlice,
    board: boardSlice,
    columns: columnsSlice,
    cards: cardsSlice,
    users: usersSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default createStore;
