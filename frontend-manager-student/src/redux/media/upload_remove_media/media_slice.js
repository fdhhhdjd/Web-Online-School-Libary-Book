//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! REDUX THUNK
import { Upload_Media_Initial } from './media_thunk';

const initialState = {
  loading_media: false,
  error: null,
  result_upload: null,
  result_destroy: null,
};
const Media_Cloud = createSlice({
  name: CONSTANTS.REDUX_NAME._MEDIA,
  initialState,
  reducers: {
    reset_upload: (state) => {
      state.result_upload = null;
    },
  },
  extraReducers: {
    //* Upload Cloud
    [Upload_Media_Initial.pending]: (state, action) => {
      state.loading_media = true;
    },
    [Upload_Media_Initial.fulfilled]: (state, action) => {
      state.loading_media = false;
      state.result_upload = action.payload.element;
    },
    [Upload_Media_Initial.rejected]: (state, action) => {
      state.loading_media = false;
      state.error = action.payload;
    },
  },
});
const Media_Cloud_Slice = Media_Cloud.reducer;
export const { reset_upload } = Media_Cloud.actions;
export default Media_Cloud_Slice;
