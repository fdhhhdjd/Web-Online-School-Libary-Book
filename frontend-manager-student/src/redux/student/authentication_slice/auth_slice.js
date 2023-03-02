//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import { Login_Mssv_Initial } from './auth_thunk';

const initialState = {
  loading: false,
  error: null,
  student_auth: [],
};

const Authentication = createSlice({
  name: 'STUDENT AUTH',
  initialState,
  reducers: {
    reset_auth: (state) => {
      state.student_auth = [];
    },
  },
  extraReducers: {
    //* Login Email_Phone have Password
    [Login_Mssv_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Mssv_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.student_auth = action.payload;
    },
    [Login_Mssv_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth } = Authentication.actions;
export default AuthenticationSlice;
