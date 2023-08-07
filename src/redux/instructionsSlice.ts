import { createSlice } from '@reduxjs/toolkit';

const instructionsSlice = createSlice({
  name: 'instructions',
  initialState: {
    shown: false,
  },
  reducers: {
    setInstructionsShown: (state) => {
      state.shown = true;
    },
  },
});

export const { setInstructionsShown } = instructionsSlice.actions;
export default instructionsSlice.reducer;
