//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION

//! API STUDENT
import API_ADMIN from 'api/api_admin';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';
import REQUEST from 'utils/request';

/**
 * @author Châu Gia Bảo
 * @created_at 28/03/2023
 * @descriptionKey Call api Get All Account admin cms
 * @function Get_All_Account_Cms_Initial
 * @return {Object}
 */
export const Get_All_Account_Cms_Initial = createAsyncThunk('admin/cms/account/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_ADMIN.GET_ALL_ACCOUNT_CMS}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: true,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      return successData;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      // return error
      return rejectWithValue(errorData);
    }
  }
});

/**
 * @author Châu Gia Bảo
 * @created_at 28/03/2023
 * @descriptionKey Call api Delete Account admin cms
 * @function Delete_Account_Cms_Initial
 * @return {Object}
 */
export const Delete_Account_Cms_Initial = createAsyncThunk(
  'admin/cms/account/delete',
  async ({ student_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.DELETE_ACCOUNT_CMS}`,
        {
          input: {
            student_id: {
              student_id,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: true,
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        NOTIFICATION.swalSuccess('Đã xóa thành công', '');

        return successData;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return error
        return rejectWithValue(errorData);
      }
    }
  },
);

/**
 * @author Châu Gia Bảo
 * @created_at 09/03/2023
 * @descriptionKey Call api Get Detail Account admin cms
 * @function Get_Detail_Account_Cms_Initial
 * @return {Object}
 */
export const Get_Detail_Account_Cms_Initial = createAsyncThunk(
  'admin/cms/account/detail',
  async ({ student_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_DETAIL_ACCOUNT_CMS}/${student_id}`, {
        headers: HELPERS.headerBrowser(),
        withCredentials: true,
      });

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        return successData;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return error
        return rejectWithValue(errorData);
      }
    }
  },
);

/**
 * @author Châu Gia Bảo
 * @created_at 26/03/2023
 * @descriptionKey Call api Create student admin cms
 * @function Create_Account_Cms_Initial
 * @return {Object}
 */
export const Create_Account_Cms_Initial = createAsyncThunk(
  'admin/cms/account/create',
  async ({ name, mssv, phone_number, class_room, email, dob, gender }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.CREATE_ACCOUNT_CMS}`,
        {
          input: {
            create_student_input: {
              name,
              mssv,
              phone_number,
              class_room,
              email,
              dob,
              gender,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: true,
        },
      );

      //Take response Success
      const successData = response?.data;

      //Check data
      if (successData) {
        // return result data
        NOTIFICATION.swalSuccess('Tạo tài khoản thành công', '');
        return successData;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return error
        return rejectWithValue(errorData);
      }
    }
  },
);
