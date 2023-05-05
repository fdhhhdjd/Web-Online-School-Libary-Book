//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import {
  Create_Major_Cms_Initial,
  Delete_Major_Cms_Initial,
  Get_All_Major_Cms_Initial,
  Get_Detail_Major_Cms_Initial,
  Update_Major_Cms_Initial,
} from './major_thunk';

const initialState = {
  loading: false,
  error: null,
  all_major: null,
  detail_major: null,
};

const Major = createSlice({
  name: 'CMS Major',
  initialState,
  reducers: {
    reset_detail_major: (state) => {
      state.detail_major = null;
    },

    reset_all_major: (state) => {
      state.all_major = null;
    },
  },
  extraReducers: {
    //* Get all Major
    [Get_All_Major_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Major_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_categories = action.payload;
    },
    [Get_All_Major_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Get detail Major CMS
    [Get_Detail_Major_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Major_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_Major = action.payload;
    },
    [Get_Detail_Major_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Create Major CMS
    [Create_Major_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Major_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Create_Major_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Update Major CMS
    [Update_Major_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Update_Major_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Update_Major_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Delete Major CMS
    [Delete_Major_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Major_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Delete_Major_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const MajorSlice = Major.reducer;
export const { reset_detail_major, reset_all_major } = Major.actions;

export default MajorSlice;
