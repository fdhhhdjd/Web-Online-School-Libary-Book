//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Delete_Book_Cms_Initial, Get_All_Book_Cms_Initial, Get_Detail_Book_Cms_Initial } from './book_thunk';

const initialState = {
  loading: false,
  error: null,
  all_books_list: null,
  detail_book: null,
};

const Book = createSlice({
  name: 'CMS Book',
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all book CMS
    [Get_All_Book_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Book_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_books_list = action.payload;
    },
    [Get_All_Book_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail book CMS
    [Get_Detail_Book_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Book_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_book = action.payload;
    },
    [Get_Detail_Book_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Delete book CMS
    [Delete_Book_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Book_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Delete_Book_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const BookSlice = Book.reducer;
export default BookSlice;
