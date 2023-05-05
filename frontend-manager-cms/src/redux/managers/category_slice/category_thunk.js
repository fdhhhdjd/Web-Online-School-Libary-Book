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
 * @descriptionKey Call api Get All Category admin cms
 * @function Get_All_Category_Cms_Initial
 * @return {Object}
 */
export const Get_All_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/category/all',
  async (_, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_ALL_CATEGORY_CMS}`, {
        headers: HELPERS.headerBrowser(),
        withCredentials: true,
      });

      //Take response Success
      const successData = response.data;
      console.log(successData);

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
 * @created_at 19/03/2023
 * @descriptionKey Call api Delete Book admin cms
 * @function Delete_Book_Cms_Initial
 * @return {Object}
 */
export const Delete_Book_Cms_Initial = createAsyncThunk(
  'admin/cms/book/delete',
  async ({ book_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.DELETE_BOOK_CMS}`,
        {
          input: {
            book_input: {
              book_id,
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
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get detail Category admin cms
 * @function Get_Detail_Category_Cms_Initial
 * @return {Object}
 */
export const Get_Detail_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/category/detail',
  async ({ id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_DETAIL_CATEGORY_CMS}/${id}`, {
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
 * @descriptionKey Call api Create Category admin cms
 * @function Create_Category_Cms_Initial
 * @return {Object}
 */
export const Create_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/category/create',
  async ({ name }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.CREATE_CATEGORY_CMS}`,
        {
          input: {
            categories_input: {
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
 * @descriptionKey Call api Update category admin cms
 * @function Update_Category_Cms_Initial
 * @return {Object}
 */
export const Update_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/category/update',
  async ({ name, category_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.EDIT_CATEGORY_CMS}`,
        {
          input: {
            categories_input: {
              name,
              category_id,
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
 * @descriptionKey Call api Delete category admin cms
 * @function Delete_Category_Cms_Initial
 * @return {Object}
 */
export const Delete_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/category/delete',
  async ({ category_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_ADMIN.DELETE_CATEGORY_CMS}`,
        {
          input: {
            categories_input: {
              category_id,
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

export const Get_Book_Category_Cms_Initial = createAsyncThunk(
  'admin/cms/book_category/all',
  async (_, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_ALL_BOOK_CATEGORY_CMS}`, {
        headers: HELPERS.headerBrowser(),
        withCredentials: true,
      });

      //Take response Success
      const successData = response.data;
      console.log(successData);

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
