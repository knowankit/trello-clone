import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from '@/src/slices/boards';
import userSlice from '@/src/slices/user';
import boardSlice from '@/src/slices/board';

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      boards: boardsSlice,
      user: userSlice,
      board: boardSlice
    },
    preloadedState
  });
};

const store = configureStore({
  reducer: {
    boards: boardsSlice,
    user: userSlice,
    board: boardSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default createStore;
