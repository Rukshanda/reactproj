// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import answerReducer from '../features/answerSlice';

export const store = configureStore({
  reducer: {
    answer: answerReducer,
  },
});
