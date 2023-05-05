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
 * @author Nguyễn Tiến Tài
 * @created_at 30/03/2023
 * @descriptionKey Call api Get All Major admin cms
 * @function Get_All_Major_Cms_Initial
 * @return {Object}
 */
export const Get_All_Major_Cms_Initial = createAsyncThunk('admin/cms/major/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_ADMIN.GET_ALL_MAJOR_CMS}`, {
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
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get detail Major admin cms
 * @function Get_Detail_Major_Cms_Initial
 * @return {Object}
 */
export const Get_Detail_Major_Cms_Initial = createAsyncThunk(
  'admin/cms/major/detail',
  async ({ id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_DETAIL_MAJOR_CMS}/${id}`, {
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
 * @author Nguyễn Tiến Tài
 * @created_at 26/03/2023
 * @descriptionKey Call api Create Major admin cms
 * @function Create_Major_Cms_Initial
 * @return {Object}
 */
export const Create_Major_Cms_Initial = createAsyncThunk(
  'admin/cms/major/create',
  async ({ name }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.CREATE_MAJOR_CMS}`,
        {
          input: {
            industry_input: {
              name,
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
        NOTIFICATION.swalSuccess('Tạo thể loại thành công', '');
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
 * @author Nguyễn Tiến Tài
 * @created_at 26/03/2023
 * @descriptionKey Call api Update major admin cms
 * @function Update_Major_Cms_Initial
 * @return {Object}
 */
export const Update_Major_Cms_Initial = createAsyncThunk(
  'admin/cms/major/update',
  async ({ name, industry_code_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.EDIT_MAJOR_CMS}`,
        {
          input: {
            industry_input: {
              name,
              industry_code_id,
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
        NOTIFICATION.swalSuccess('Cập nhật thành công', '');
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
 * @author Nguyễn Tiến Tài
 * @created_at 26/03/2023
 * @descriptionKey Call api Delete major admin cms
 * @function Delete_Major_Cms_Initial
 * @return {Object}
 */
export const Delete_Major_Cms_Initial = createAsyncThunk(
  'admin/cms/major/delete',
  async ({ industry_code_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.DELETE_MAJOR_CMS}`,
        {
          input: {
            industry_input: {
              industry_code_id,
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
        NOTIFICATION.swalSuccess('Xóa thành công', '');
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
