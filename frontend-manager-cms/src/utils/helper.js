//!LIBRARY
import jwt_decode from 'jwt-decode';
import moment from 'moment';

//! SHARE
import CONSTANTS from 'configs/constants';
import { getDeviceId, getToken } from './auth';

const HELPERS = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @uodated_at 04/03/2023
   * @descriptionKey return header browser
   * @function getToken
   * @return {String}
   */
  headerBrowser: () => {
    // add the authorization to the headers
    const headers = {
      'X-DEVICE-ID': getDeviceId(),
      'X-OS-TYPE': CONSTANTS.OS_TYPE_HEADER,
      'X-OS-VERSION': CONSTANTS.OS_VERSION_HEADER,
      'X-APP-VERSION': CONSTANTS.APP_VERSION_HEADER,
      'X-DEVICE-NAME': window.navigator.userAgent,
    };
    const token = getToken(CONSTANTS.AUTH_TOKEN);
    if (token) {
      headers.authorization = token ? `Bearer ${token}` : null;
    }

    return headers;
  },
  headerBrowserMedia: () => {
    // add the authorization to the headers
    const headers = {
      'Content-Type': 'multipart/form-data',
      'X-DEVICE-ID': getDeviceId(),
      'X-OS-TYPE': CONSTANTS.OS_TYPE_HEADER,
      'X-OS-VERSION': CONSTANTS.OS_VERSION_HEADER,
      'X-APP-VERSION': CONSTANTS.APP_VERSION_HEADER,
      'X-DEVICE-NAME': window.navigator.userAgent,
    };
    const token = getToken(CONSTANTS.AUTH_TOKEN);
    if (token) {
      headers.authorization = token ? `Bearer ${token}` : null;
    }

    return headers;
  },
  formDataGeneral: (target) => {
    const formData = new FormData(target);
    return Object.fromEntries(formData);
  },
  takeDataResponse: (successData) => {
    if (successData.element) {
      return {
        status: successData.status,
        message: successData.message,
        data: successData.element.result || null,
      };
    }
    return {
      status: successData.status,
      message: successData.message,
    };
  },
  isTokenExpired: (access_token) => {
    //Check token not found
    if (!access_token) {
      return false;
    }
    try {
      //Take Data from token
      const decodedToken = jwt_decode(access_token);

      // Expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        return true;
      }
      // Due
      return false;
    } catch (err) {
      return false;
    }
  },
  getGenderLabel: (gender) => {
    switch (gender) {
      case 0:
        return 'Nữ';
      case 1:
        return 'Nam';
      default:
        return 'Khác';
    }
  },
  formatTimeWithHour: (time) => {
    return moment(time).format('DD-MM-YYYY, h:mm:ss a');
  },
  getStatusBorrow: (status) => {
    switch (status) {
      case 10:
        return {
          label: 'Chờ xác nhận',
          className: 'pending',
        };
      case 20:
        return {
          label: 'Đang mượn',
          className: 'processing',
        };
      case 30:
        return {
          label: 'Đã trả',
          className: 'success',
        };
      case 40:
        return {
          label: 'Quá hạn',
          className: 'errror',
        };

      case 50: {
        return {
          label: 'Đã mất (Chưa xử lý)',
          className: 'blue',
        };
      }

      case 60: {
        return {
          label: 'Đã mất (Đã xử lý)',
          txtColor: 'blue',
          bgColor: 'white',
        };
      }
      default:
        return 'Chưa xác định';
    }
  },
  getAuthorNameByID: (id, authorList) => {
    const author = authorList && authorList.find((author) => author.value === id);
    return author;
  },

  handleSearchText: (item, searchValue) => {
    return item.toLowerCase().trim().includes(searchValue.toLowerCase().trim());
  },
};

export default HELPERS;
