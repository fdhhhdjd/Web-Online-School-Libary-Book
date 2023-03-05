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
    const token = getToken();
    if (token) {
      headers.Authorization = token ? `Bearer ${token}` : null;
    }

    return headers;
  },
  formDataGeneral: (target) => {
    const formData = new FormData(target);
    return Object.fromEntries(formData);
  },
};

export default HELPERS;
