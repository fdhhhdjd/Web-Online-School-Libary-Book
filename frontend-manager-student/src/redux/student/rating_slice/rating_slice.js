//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';
import { Create_Rating_Cms_Initial } from './rating_thunk';

//! CALL API REDUX THUNK

const initialState = {
  loading: false,
  error: null,
};

const Rating = createSlice({
  name: CONSTANTS.REDUX_NAME._RATING,
  initialState,
  reducers: {},
  extraReducers: {
    //* Create Rating
    [Create_Rating_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Rating_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Create_Rating_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const RatingSlice = Rating.reducer;
export default RatingSlice;
