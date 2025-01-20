import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  clubs: [],
  selectedClub: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    updateClubs: (state, action) => {
      state.clubs = action.payload;
    },
    updateSelectedClub: (state, action) => {
      state.selectedClub = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.selectedClub = null;
      state.clubs = [];
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateClubs,
  updateSelectedClub,
} = userSlice.actions;
export default userSlice.reducer;
