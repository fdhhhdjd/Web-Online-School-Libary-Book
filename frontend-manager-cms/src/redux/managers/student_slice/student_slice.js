//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import {
  Create_Account_Cms_Initial,
  Get_All_Account_Cms_Initial,
  Get_Detail_Account_Cms_Initial,
} from './student_thunk';

const initialState = {
  loading: false,
  error: null,
  all_accounts: null,
  detail_account: null,
};

const Student = createSlice({
  name: 'CMS Student',
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all account CMS
    [Get_All_Account_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Account_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_accounts = action.payload;
    },
    [Get_All_Account_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail account CMS
    [Get_Detail_Account_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Account_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_account = action.payload;
    },
    [Get_Detail_Account_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Create account CMS
    [Create_Account_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Account_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Create_Account_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const StudentSlice = Student.reducer;
export default StudentSlice;
