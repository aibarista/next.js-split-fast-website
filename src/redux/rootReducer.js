import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import userReducer from '../services/user/userSlice';
import eventReducer from '../services/admin/event/eventSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  event: eventReducer
});

export default rootReducer;
