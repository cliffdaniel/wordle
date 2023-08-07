import { createSlice, createNextState } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
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
