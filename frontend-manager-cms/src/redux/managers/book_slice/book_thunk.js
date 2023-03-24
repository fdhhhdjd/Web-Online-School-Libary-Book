//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! NOTIFICATION

//! API STUDENT
import API_ADMIN from 'api/api_admin';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';
import REQUEST from 'utils/request';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get All Book admin cms
 * @function Get_All_Book_Cms_Initial
 * @return {Object}
 */
export const Get_All_Book_Cms_Initial = createAsyncThunk('admin/cms/book/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_ADMIN.GET_ALL_BOOK_CMS}`, {
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
 * @created_at 19/03/2023
 * @descriptionKey Call api Get All Book admin cms
 * @function Get_Detail_Book_Cms_Initial
 * @return {Object}
 */
export const Delete_Book_Cms_Initial = createAsyncThunk(
  'admin/cms/book/delete',
  async ({ book_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(
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
 * @author Châu Gia Bảo
 * @created_at 09/03/2023
 * @descriptionKey Call api Get All Book admin cms
 * @function Get_Detail_Book_Cms_Initial
 * @return {Object}
 */
export const Get_Detail_Book_Cms_Initial = createAsyncThunk(
  'admin/cms/book/detail',
  async ({ book_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.get(`${API_ADMIN.GET_DETAIL_BOOK_CMS}/${book_id}`, {
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
