//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import {
  Delete_Author_Cms_Initial,
  Edit_Author_Cms_Initial,
  Get_All_Author_Cms_Initial,
  Get_Detail_Author_Cms_Initial,
} from './author_thunk';

const initialState = {
  loading: false,
  error: null,
  all_authors_list: null,
  detail_author: null,
};

const Author = createSlice({
  name: 'CMS Author',
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all author
    [Get_All_Author_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Author_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_authors_list = action.payload;
    },
    [Get_All_Author_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail author
    [Get_Detail_Author_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Author_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_author = action.payload;
    },
    [Get_Detail_Author_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Delete author
    [Delete_Author_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Author_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Delete_Author_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Edit author
    [Edit_Author_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Edit_Author_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Edit_Author_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthorSlice = Author.reducer;
export default AuthorSlice;
