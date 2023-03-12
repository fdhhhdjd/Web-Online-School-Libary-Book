//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Get_All_Book_Cms_Initial } from './book_thunk';

const initialState = {
  loading: false,
  error: null,
  all_books_list: [],
};

const Book = createSlice({
  name: 'CMS Book',
  initialState,
  reducers: {},
  extraReducers: {
    //* Login CMS
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
  },
});
const BookSlice = Book.reducer;
export default BookSlice;
