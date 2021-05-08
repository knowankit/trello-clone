import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from '@/src/slices/boards';

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      boards: boardsSlice
    },
    preloadedState
  });
};

export default createStore;
