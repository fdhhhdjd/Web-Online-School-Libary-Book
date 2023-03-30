//! LIBARY
import { createSlice } from '@reduxjs/toolkit';

//! SHARE
import CONSTANTS from 'configs/constants';

//! CALL API REDUX THUNK
import {
  Login_Mssv_Initial,
  Logout_Student_Initial,
  Profile_Student_Initial,
  Renew_Token_Student_Initial,
  Change_Password_Initial,
  Forget_Password_Initial,
  Reset_Password_Initial,
  Update_Student_Initial,
} from './auth_thunk';

const initialState = {
  loading_login: false,
  loading_change_password: false,
  loading_forget_password: false,
  loading_reset_password: false,
  loading: false,
  error: null,
  token_student: null,
  profile_student: null,
};

const Authentication = createSlice({
  name: CONSTANTS.REDUX_NAME._AUTH,
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
      state.loading_login = true;
    },
    [Login_Mssv_Initial.fulfilled]: (state, action) => {
      state.loading_login = false;
      state.token_student = action.payload;
    },
    [Login_Mssv_Initial.rejected]: (state, action) => {
      state.loading_login = false;
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

    //* UPDATE PROFILE
    [Update_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },

    [Update_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [Update_Student_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //* LOGOUT STUDENT
    [Logout_Student_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Logout_Student_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.token_student = null;
      state.profile_student = null;
    },
    [Logout_Student_Initial.rejected]: (state, action) => {
      state.loading = true;
    },

    //* CHANGE PASSWORD STUDENT
    [Change_Password_Initial.pending]: (state, action) => {
      state.loading_change_password = true;
    },

    [Change_Password_Initial.fulfilled]: (state, action) => {
      state.loading_change_password = true;
      state.token_student = null;
      state.profile_student = null;
    },

    [Change_Password_Initial.rejected]: (state, action) => {
      state.loading_change_password = false;
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

    //* FORGET PASSWORD
    [Forget_Password_Initial.pending]: (state, action) => {
      state.loading_forget_password = true;
    },
    [Forget_Password_Initial.fulfilled]: (state, action) => {
      state.loading_forget_password = false;
    },
    [Forget_Password_Initial.rejected]: (state, action) => {
      state.loading_forget_password = false;
      state.error = action.payload;
    },

    //* FORGET PASSWORD
    [Reset_Password_Initial.pending]: (state, action) => {
      state.loading_reset_password = true;
    },
    [Reset_Password_Initial.fulfilled]: (state, action) => {
      state.loading_reset_password = false;
    },
    [Reset_Password_Initial.rejected]: (state, action) => {
      state.loading_reset_password = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth } = Authentication.actions;
export default AuthenticationSlice;
