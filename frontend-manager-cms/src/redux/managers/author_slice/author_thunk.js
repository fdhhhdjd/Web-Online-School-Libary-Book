//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! API STUDENT
import API_ADMIN from 'api/api_admin';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';
import REQUEST from 'utils/request';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get Detail Author admin cms
 * @function Get_Detail_Author_Cms_Initial
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
    const successData = response?.data;

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
 * @descriptionKey Call api Delete Author admin cms
 * @function Delete_Author_Cms_Initial
 * @return {Object}
 */
export const Delete_Author_Cms_Initial = createAsyncThunk(
  'admin/cms/author/delete',
  async ({ author_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.DELETE_AUTHOR_CMS}`,
        {
          input: {
            author_input: {
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
      const successData = response?.data;

      //Check data
      if (successData) {
        NOTIFICATION.swalSuccess('Đã xóa thành công', '');

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
 * @created_at 09/03/2023
 * @descriptionKey Call api Create Author admin cms
 * @function Create_Author_Cms_Initial
 * @return {Object}
 */
export const Create_Author_Cms_Initial = createAsyncThunk(
  'admin/cms/author/create',
  async ({ name, avatar_uri, public_id_avatar, dob, gender, nation }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.CREATE_AUTHOR_CMS}`,
        {
          input: {
            author_input: {
              name,
              avatar_uri,
              nation,
              dob,
              gender,
              public_id_avatar,
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
        NOTIFICATION.swalSuccess('Thêm tác giả thành công', '');
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
 * @created_at 29/03/2023
 * @descriptionKey Call api Edit Author admin cms
 * @function Edit_Author_Cms_Initial
 * @return {Object}
 */
export const Edit_Author_Cms_Initial = createAsyncThunk(
  'admin/cms/author/update',
  async ({ name, avatar_uri, public_id_avatar, dob, gender, nation, author_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.EDIT_AUTHOR_CMS}`,
        {
          input: {
            author_input: {
              author_id,
              name,
              avatar_uri,
              nation,
              dob,
              gender,
              public_id_avatar,
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
        NOTIFICATION.swalSuccess('Chỉnh sửa tác giả thành công', '');
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
