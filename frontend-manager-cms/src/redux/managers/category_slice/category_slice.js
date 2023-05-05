//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import {
  Create_Category_Cms_Initial,
  Delete_Category_Cms_Initial,
  Get_All_Category_Cms_Initial,
  Get_Detail_Category_Cms_Initial,
  Update_Category_Cms_Initial,
} from './category_thunk';

const initialState = {
  loading: false,
  error: null,
  all_categories: null,
  detail_category: null,
};

const Category = createSlice({
  name: 'CMS Category',
  initialState,
  reducers: {
    reset_detail_category: (state) => {
      state.detail_category = null;
    },

    reset_all_categories: (state) => {
      state.all_categories = null;
    },
  },
  extraReducers: {
    //* Get all category
    [Get_All_Category_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Category_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_categories = action.payload;
    },
    [Get_All_Category_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get detail category CMS
    [Get_Detail_Category_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Category_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail_category = action.payload;
    },
    [Get_Detail_Category_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Create Category CMS
    [Create_Category_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Category_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Create_Category_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Update Category CMS
    [Update_Category_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Update_Category_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Update_Category_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Delete Category CMS
    [Delete_Category_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Category_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Delete_Category_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const CategorySlice = Category.reducer;
export const { reset_detail_category, reset_all_categories } = Category.actions;

export default CategorySlice;
