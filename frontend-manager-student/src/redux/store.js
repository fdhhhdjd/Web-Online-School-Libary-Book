import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import AuthenticationSlice from './authentication_slice/auth_slice';
const rootReducer = (state, action) => {
  return AuthenticationSlice(state, action);
};
let store;
store = configureStore({
  reducer: {
    auth_user: AuthenticationSlice,
    reducer: rootReducer,
  },
  middleware:
    process.env.NODE_ENV !== 'production'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
