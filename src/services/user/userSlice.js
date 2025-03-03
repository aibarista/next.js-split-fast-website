import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  clubs: [],
  selectedClub: null,
  loading: false,
  error: null,
  clubRecordsPendingCount: 0,
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
    updateClubRecordsPendingCount: (state, action) => {
      state.clubRecordsPendingCount = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.clubs = [];
      state.loading = false;
      state.selectedClub = null;
      state.clubRecordsPendingCount = 0;
      state.error = null;
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
  updateClubRecordsPendingCount,
} = userSlice.actions;
export default userSlice.reducer;
