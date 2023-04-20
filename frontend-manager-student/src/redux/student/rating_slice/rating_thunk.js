//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION

//! API STUDENT
import USER_API from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';
import REQUEST from 'utils/request';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 5/04/2023
 * @descriptionKey Call api create rating admin cms
 * @function Create_Rating_Cms_Initial
 * @return {Object}
 */
export const Create_Rating_Cms_Initial = createAsyncThunk(
  'admin/cms/rating/create',
  async ({ borrowed_book_id, book_id, rating }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${USER_API.RATE_BOOK}`,
        {
          input: {
            rating_input: {
              borrowed_book_id,
              book_id,
              rating,
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
        NOTIFICATION.swalSuccess('Đánh giá thành công', '');
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
