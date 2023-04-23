//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! CALL API REDUX THUNK
import { Create_Comment_Initial, Get_Comment_Initial } from './comment_thunk';

const initialState = {
  loading: false,
  error: null,
  all_comments: null,
};

const Comment = createSlice({
  name: CONSTANTS.REDUX_NAME._COMMENT,
  initialState,
  reducers: {
    reset_comment: (state) => {
      state.all_comments = null;
    },
  },
  extraReducers: {
    //* Get all books
    [Get_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Comment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_comments = action.payload;
    },
    [Get_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* borrow book
    [Create_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Comment_Initial.fulfilled]: (state, action) => {},
    [Create_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const CommentSlice = Comment.reducer;
export const { reset_comment } = Comment.actions;
export default CommentSlice;
