import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventStatus: "published"
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    eventStatusUpdate: (state, action) => {
      state.eventStatus = action.payload;
    },
  },
});

export const { eventStatusUpdate } = eventSlice.actions;
export default eventSlice.reducer;
