//!LIBRARY
import jwt_decode from 'jwt-decode';

//! SHARE
import { getDeviceId, getToken } from './auth';
import CONSTANTS from 'configs/constants';

const HELPERS = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey return header browser
   * @function getToken
   * @return {String}
   */
  headerBrowser: () => {
    // add the authorization to the headers
    const headers = {
      'Content-Type': 'application/json',
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
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey Form input
   * @return {Object}
   */
  formDataGeneral: (target) => {
    const formData = new FormData(target);
    return Object.fromEntries(formData);
  },
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 04/03/2023
   * @descriptionKey Convert data response Thunk
   * @return {Object}
   */
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
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 04/03/2023
   * @descriptionKey Check token access expired
   * @return {Object}
   */
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
        return false;
      }
      // Due
      return true;
    } catch (err) {
      return false;
    }
  },
};

export default HELPERS;
