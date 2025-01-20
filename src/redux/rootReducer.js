import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import userReducer from '../services/user/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
