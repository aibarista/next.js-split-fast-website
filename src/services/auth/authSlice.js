import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authInfo: {
    subscriptionLevel: 2,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInfoUpdate: (state, action) => {
      state.authInfo = action.payload;
    },
  },
});

export const { authInfoUpdate } = authSlice.actions;
export default authSlice.reducer;
