//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! CALL API REDUX THUNK
import { Borrow_Book_Student_Initial, Get_All_Borrowed_Book_Initial } from './borrow_thunk';

const initialState = {
  loading: false,
  error: null,
  all_borrow_list: null,
  detail_borrow: null,
};

const BorrowBook = createSlice({
  name: CONSTANTS.REDUX_NAME._BOOK,
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all books
    [Get_All_Borrowed_Book_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Borrowed_Book_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_borrow_list = action.payload;
    },
    [Get_All_Borrowed_Book_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* borrow book
    [Borrow_Book_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Borrow_Book_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Borrow_Book_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const BorrowBookSlice = BorrowBook.reducer;
export default BorrowBookSlice;
