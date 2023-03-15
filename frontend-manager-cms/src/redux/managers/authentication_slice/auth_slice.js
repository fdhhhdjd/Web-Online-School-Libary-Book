//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Login_Cms_Initial, Renew_Token_Cms_Initial } from './auth_thunk';

const initialState = {
  loading: false,
  error: null,
  token_student: null,
  admin_auth: null,
};

const Authentication = createSlice({
  name: 'CMS AUTH',
  initialState,
  reducers: {
    reset_auth: (state) => {
      state.admin_auth = [];
    },
  },
  extraReducers: {
    //* Login CMS
    [Login_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.admin_auth = action.payload;
    },
    [Login_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* GET RE_NEW_TOKEN
    [Renew_Token_Cms_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Renew_Token_Cms_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.token_student = action.payload;
    },
    [Renew_Token_Cms_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth } = Authentication.actions;
export default AuthenticationSlice;
