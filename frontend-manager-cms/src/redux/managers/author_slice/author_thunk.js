//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! API STUDENT
import API_ADMIN from 'api/api_admin';

//! SHARE
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get Detail Author admin cms
 * @function Get_All_Author_Cms_Initial
 * @return {Object}
 */
export const Get_Detail_Author_Cms_Initial = createAsyncThunk(
  'admin/cms/author/detail',
  async ({ id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_DETAIL_AUTHOR_CMS}/${id}`, {
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
 * @created_at 09/03/2023
 * @descriptionKey Call api Get All Author admin cms
 * @function Get_All_Author_Cms_Initial
 * @return {Object}
 */
export const Get_All_Author_Cms_Initial = createAsyncThunk('admin/cms/author/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_ADMIN.GET_ALL_AUTHOR_CMS}`, {
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
 * @created_at 09/03/2023
 * @descriptionKey Call api Get All Author admin cms
 * @function Get_All_Author_Cms_Initial
 * @return {Object}
 */
export const Delete_Author_Cms_Initial = createAsyncThunk(
  'admin/cms/author/delete',
  async ({ author_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(
        `${API_ADMIN.GET_ALL_AUTHOR_CMS}`,
        {
          input: {
            user_login_input: {
              author_id,
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
