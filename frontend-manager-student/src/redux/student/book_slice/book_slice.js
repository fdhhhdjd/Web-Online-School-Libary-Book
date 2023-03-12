//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Get_All_Book_Student_Initial, Get_Detail_Book_Student_Initial } from './book_thunk';

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
    //* Get all books
    [Get_All_Book_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Book_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_books_list = action.payload;
    },
    [Get_All_Book_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail book
    [Get_Detail_Book_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Book_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_book = action.payload;
    },
    [Get_Detail_Book_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const BookSlice = Book.reducer;
export default BookSlice;
