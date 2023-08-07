import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LettersState } from '../interfaces/letters';

const initialState: LettersState = {
  letters: Array(5).fill(Array(5).fill('')),
};

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<{ row: number; col: number; letter: string }>) => {
      const { row, col, letter } = action.payload;
      state.letters[row][col] = letter;
    },
  },
});

export const { addLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
