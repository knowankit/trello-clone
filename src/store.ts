import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from '@/src/slices/boards';
import userSlice from '@/src/slices/user';

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      boards: boardsSlice,
      user: userSlice
    },
    preloadedState
  });
};

const store = configureStore({
  reducer: {
    boards: boardsSlice,
    user: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default createStore;
