import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Word {
  word: string;
  status: 'complete' | 'incomplete';
}

interface WordsState {
  words: { [word: string]: 'complete' | 'incomplete' };
  taken: boolean;
  current: string;
  gameOver: boolean;
}

const initialState: WordsState = {
  words: {},
  taken: false,
  current: '',
  gameOver: false
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      const word = action.payload;
      if (!state.words[word]) {
        state.words[word] = 'incomplete';
      }
    },
    completeWord: (state, action: PayloadAction<string>) => {
      const word = action.payload;
      if (state.words[word]) {
        state.words[word] = 'complete';
      }
    },
    takeWord: (state, action: PayloadAction<boolean>) => {
      state.taken = action.payload;
    },
    currentWord: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload;
    },
  },
});

export const { addWord, completeWord, takeWord, currentWord, setGameOver } = wordsSlice.actions;
export default wordsSlice.reducer;
