//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Get_All_Borrow_Cms_Initial, Get_Detail_Borrow_Cms_Initial } from './borrow_thunk';

const initialState = {
  loading: false,
  error: null,
  all_borrow_list: null,
  detail_borrow: null,
};

const BorrowBook = createSlice({
  name: 'CMS Borrow Book',
  initialState,
  reducers: {
    reset_detail_borrow: (state) => {
      state.detail_borrow = null;
    },
  },
  extraReducers: {
    //* Get all borrow CMS
    [Get_All_Borrow_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Borrow_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_borrow_list = action.payload;
    },
    [Get_All_Borrow_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail borrow CMS
    [Get_Detail_Borrow_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Borrow_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_borrow = action.payload;
    },
    [Get_Detail_Borrow_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const BorrowBookSlice = BorrowBook.reducer;
export const { reset_detail_borrow } = BorrowBook.actions;

export default BorrowBookSlice;
