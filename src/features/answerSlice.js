// src/features/answerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    answer: '',
  },
  reducers: {
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
});

export const { setAnswer } = answerSlice.actions;
export default answerSlice.reducer;
