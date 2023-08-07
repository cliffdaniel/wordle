import { createSlice } from '@reduxjs/toolkit';
import { InstructionsState } from '../interfaces/instructions';

const initialState: InstructionsState = {
  shown: false,
};

const instructionsSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: {
    setInstructionsShown: (state) => {
      state.shown = true;
    },
  },
});

export const { setInstructionsShown } = instructionsSlice.actions;
export default instructionsSlice.reducer;
