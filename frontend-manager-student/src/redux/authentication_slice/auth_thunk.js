import { createAsyncThunk } from '@reduxjs/toolkit';
import API_USERS from 'api/api_user';
import axios from 'axios';

export const Login_Email_Phone_Initial = createAsyncThunk(
  'Users/Login/Email/Phone',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_EMAIL_PHONE}`, {
        email_phone: email,
        password,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
