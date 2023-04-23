//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! CALL API REDUX THUNK
import { Get_All_Category_Initial } from './category_thunk';

const initialState = {
  loading: false,
  error: null,
  all_categories: null,
};

const Catgory = createSlice({
  name: CONSTANTS.REDUX_NAME._CATEGORY,
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all books
    [Get_All_Category_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Category_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_categories = action.payload;
    },
    [Get_All_Category_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const CatgorySlice = Catgory.reducer;
export default CatgorySlice;
