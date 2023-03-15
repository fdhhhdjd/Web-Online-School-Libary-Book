//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! CALL API REDUX THUNK
import {
  Login_Mssv_Initial,
  Logout_Student_Initial,
  Profile_Student_Initial,
  Renew_Token_Student_Initial,
} from './auth_thunk';

const initialState = {
  loading: false,
  error: null,
  token_student: null,
  profile_student: null,
};

const Authentication = createSlice({
  name: 'AUTH STUDENT',
  initialState,
  reducers: {
    reset_profile: (state) => {
      state.profile_student = null;
    },
    reset_token: (state) => {
      state.token_student = null;
    },
  },
  extraReducers: {
    //* POST LOGIN MSSV STUDENT
    [Login_Mssv_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Mssv_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.token_student = action.payload;
    },
    [Login_Mssv_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* GET PROFILE
    [Profile_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },

    [Profile_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile_student = action.payload;
    },

    [Profile_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* LOGOUT STUDENT
    [Logout_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },

    [Logout_Student_Initial.fulfilled]: (state, action) => {
      state.loading = true;
      state.token_student = null;
      state.profile_student = null;
    },

    [Logout_Student_Initial.rejected]: (state, action) => {
      state.loading = true;
    },

    //* GET RE_NEW_TOKEN
    [Renew_Token_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Renew_Token_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.token_student = action.payload;
    },
    [Renew_Token_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth } = Authentication.actions;
export default AuthenticationSlice;
