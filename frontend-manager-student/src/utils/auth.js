//! LIBRARY
import { nanoid } from 'nanoid';

//! SHARE
import CONSTANTS from '../configs/constants';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 02/03/2023
 * @descriptionKey Create id computer
 * @function getDeviceId
 * @return {String}
 */
export function getDeviceId() {
  let result = localStorage.getItem(CONSTANTS.DEVICE_ID);
  if (result) {
    return result;
  } else {
    result = nanoid(CONSTANTS.RANDOM_NANO_ID);
    localStorage.setItem(CONSTANTS.DEVICE_ID, result);
    return result;
  }
}

/**
 * @author Nguyễn Tiến Tài
 * @created_at 02/03/2023
 * @descriptionKey Get Token localStorage
 * @function getToken
 * @return {String}
 */
export function getToken(key) {
  return localStorage.getItem(key);
}

/**
 * @author Nguyễn Tiến Tài
 * @created_at 02/03/2023
 * @descriptionKey Set Token localStorage
 * @function getToken
 * @return {String}
 */
export function setToken(key, value) {
  return localStorage.setItem(key, value);
}

export function clearToken() {
  localStorage.removeItem('access_token');
  return;
}
