//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';
import { Add_Favorite_Initial, Get_All_Favorite_Initial } from './favorite_thunk';

//! CALL API REDUX THUNK

const initialState = {
  loading: false,
  error: null,
  favorite_list: null,
};

const Favorite = createSlice({
  name: CONSTANTS.REDUX_NAME._FAVORITE,
  initialState,
  reducers: {},
  extraReducers: {
    //* Create Favorite
    [Add_Favorite_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Add_Favorite_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Add_Favorite_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* Get all Favorite
    [Get_All_Favorite_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Favorite_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.favorite_list = action.payload;
    },
    [Get_All_Favorite_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const FavoriteSlice = Favorite.reducer;
export default FavoriteSlice;
