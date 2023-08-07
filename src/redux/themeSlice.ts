import { createSlice, createNextState } from '@reduxjs/toolkit';
import { ThemeState } from '../interfaces/theme';

const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      return createNextState(state, draftState => {
        draftState.theme = draftState.theme === 'light' ? 'dark' : 'light';
      });
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
