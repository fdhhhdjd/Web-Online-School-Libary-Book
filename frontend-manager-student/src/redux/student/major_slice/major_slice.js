//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! CALL API REDUX THUNK
import { Get_All_Major_Initial } from './major_thunk';

const initialState = {
  loading: false,
  error: null,
  all_major: null,
};

const Major = createSlice({
  name: CONSTANTS.REDUX_NAME._MAJOR,
  initialState,
  reducers: {},
  extraReducers: {
    //* Get all books
    [Get_All_Major_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Major_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_major = action.payload;
    },
    [Get_All_Major_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const MajorSlice = Major.reducer;
export default MajorSlice;
