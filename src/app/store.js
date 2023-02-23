import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/sample/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
