//! LIBRARY
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

//! SHARE
import CONSTANTS from 'configs/constants';

//! DATA TOOLKIT
import AuthenticationSlice from './managers/authentication_slice/auth_slice';
import CONFIGS from 'configs/configs';
import BookSlice from './managers/book_slice/book_slice';
import AuthorSlice from './managers/author_slice/author_slice';
import MediaSlice from './media/upload_remove_media/media_slice';
import StudentSlice from './managers/student_slice/student_slice';
import BorrowBookSlice from './managers/borrow_slice/borrow_slice';
import CategorySlice from './managers/category_slice/category_slice';
import MajorSlice from './managers/major_slice/major_slice';
const rootReducer = (state, action) => {
  return AuthenticationSlice(state, action);
};

let store;
store = configureStore({
  reducer: {
    admin_user: AuthenticationSlice,
    book: BookSlice,
    author: AuthorSlice,
    media: MediaSlice,
    student: StudentSlice,
    borrow: BorrowBookSlice,
    category: CategorySlice,
    major: MajorSlice,
    reducer: rootReducer,
  },
  middleware:
    CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: CONFIGS.REACT_APP_NODE_ENV !== CONSTANTS.REACT_ENV_PR,
});

export default store;
