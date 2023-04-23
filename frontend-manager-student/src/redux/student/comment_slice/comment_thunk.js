//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! API STUDENT
import API_USER from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';
import CONSTANTS from 'configs/constants';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 14/03/2023
 * @descriptionKey Call api Get Comment student
 * @function Get_Comment_Initial
 * @return {Object}
 */
export const Get_Comment_Initial = createAsyncThunk(
  'customer/comment/get',
  async ({ book_id, slug }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_USER.GET_COMMENT}`,
        {
          input: {
            comment_input: {
              book_id,
              slug,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: CONSTANTS.DELETED_ENABLE,
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

/**
 * @author Nguyễn Tiến Tài
 * @created_at 14/03/2023
 * @descriptionKey Call api Create Comment student
 * @function Create_Comment_Initial
 * @return {Object}
 */
export const Create_Comment_Initial = createAsyncThunk(
  'customer/comment/create',
  async ({ book_id, parent_slug, content }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_USER.CREATE_COMMENT}`,
        {
          input: {
            comment_input: {
              book_id,
              parent_slug,
              content,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: CONSTANTS.DELETED_ENABLE,
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
