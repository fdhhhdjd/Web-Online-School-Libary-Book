import { createSlice } from '@reduxjs/toolkit';
import { Login_Email_Phone_Initial } from './auth_thunk';
const initialState = {
  loading: false,
  error: null,
  auth: [],
};
const Authentication = createSlice({
  name: 'Auth_User',
  initialState,
  reducers: {
    reset_auth: (state) => {
      state.auth = [];
    },
  },
  extraReducers: {
    //* Login Email_Phone have Password
    [Login_Email_Phone_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Email_Phone_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Login_Email_Phone_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth } = Authentication.actions;
export default AuthenticationSlice;
