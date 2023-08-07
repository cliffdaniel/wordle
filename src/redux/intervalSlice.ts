import { createSlice } from '@reduxjs/toolkit';

interface IntervalState {
  intervalId: number | null;
  intervalStart: number;
}

const initialState: IntervalState = {
  intervalId: null,
  intervalStart: 0,
};

const intervalSlice = createSlice({
  name: 'interval',
  initialState,
  reducers: {
    setIntervalId: (state, action) => {
      state.intervalId = action.payload;
      const currentTime = Date.now();
      localStorage.setItem('intervalStart', JSON.stringify(currentTime));
      state.intervalStart = currentTime;
    },
    clearIntervalId: (state) => {
      if (state.intervalId !== null) {
        clearInterval(state.intervalId);
        state.intervalId = null;
        state.intervalStart = 0;
      }
    },
  },
});

export const { setIntervalId, clearIntervalId } = intervalSlice.actions;
export default intervalSlice.reducer;
