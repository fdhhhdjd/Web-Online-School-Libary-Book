//! LIBRARY
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

//! SHARE
import CONSTANTS from 'configs/constants';

//! DATA TOOLKIT
import AuthenticationSlice from './managers/authentication_slice/auth_slice';
import CONFIGS from 'configs/configs';
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
    CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR,
});

export default store;
