//! SHARE
import { getDeviceId, getToken } from './auth';

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
      'X-DEVICE-ID': getDeviceId(),
      'X-OS-TYPE': 'web',
      'X-OS-VERSION': '1.0',
      'X-APP-VERSION': '1.0',
      'X-DEVICE-NAME': window.navigator.userAgent,
    };
    const token = getToken();
    if (token) {
      headers.authorization = token ? `Bearer ${token}` : null;
    }

    return headers;
  },
  formDataGeneral: (target) => {
    const formData = new FormData(target);
    return Object.fromEntries(formData);
  },
};

export default HELPERS;
