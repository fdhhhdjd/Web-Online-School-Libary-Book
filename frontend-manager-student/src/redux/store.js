//! LIBRARY
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

//! SHARE
import CONSTANTS from 'configs/constants';

//! DATA TOOLKIT
import AuthenticationSlice from './student/authentication_slice/auth_slice';
import CONFIGS from 'configs/configs';
import BookSlice from './student/book_slice/book_slice';
import MediaSlice from './media/upload_remove_media/media_slice';
const rootReducer = (state, action) => {
  return AuthenticationSlice(state, action);
};

const store = configureStore({
  reducer: {
    auth_student: AuthenticationSlice,
    book: BookSlice,
    media: MediaSlice,
    reducer: rootReducer,
  },
  middleware:
    CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR,
});

export default store;
