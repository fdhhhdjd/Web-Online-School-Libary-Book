const CONSTANTS = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @description millisecond/ second
   * @return {Number}
   */
  NODE_ENV: 'DEVELOPER',
  REACT_ENV_PR: 'PRODUCTION',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @description millisecond/ second
   * @return {Number}
   */
  _1_MINUTES: 60 * 1000,
  _4_MINUTES: 4 * 60 * 1000,
  _5_MINUTES: 5 * 60 * 1000,
  _15_MINUTES: 15 * 60 * 1000,
  _45_MINUTES: 45 * 60 * 1000,
  _1_DAY: 24 * 60 * 60 * 1000,
  _7_DAY: 7 * 24 * 60 * 60 * 1000,
  _1_DAY_S: 24 * 60 * 60,
  _1_HOURS_S: 60 * 60,
  _1_YEAR: 365 * 24 * 60 * 60 * 1000,

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @description time toast
   * @return {Number}
   */
  AUTO_CLOSE: 4000,
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @description Delete Cache
   * @return {Number}
   */
  _DEFAULT_CACHE_TIME: 15,

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @description Delete Flag
   * @return {Boolean}
   */
  DELETED_ENABLE: true,
  DELETED_DISABLE: false,

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey save Localstorage device
   * @return {String}
   */
  DEVICE_ID: 'device-id',

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey Random key id
   * @return {Number}
   */
  RANDOM_NANO_ID: 50,
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey Key Auth token localStorage
   * @return {Number}
   */
  AUTH_TOKEN: 'auth-token',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 04/03/2023
   * @descriptionKey Header
   * @return {Number}
   */
  OS_TYPE_HEADER: 'web',
  OS_VERSION_HEADER: '1.0',
  APP_VERSION_HEADER: '1.0',
  ACCEPT_HEADER: 'application/json',
  BEARER_HEADER: 'Bearer',

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 15/03/2023
   * @updated_at 22/03/2023
   * @descriptionKey STATUS CODE
   * @return {string}
   */
  STATUS: {
    // 2XX
    _OK: 200,
    //4X,
    _BAD_REQUEST: 400,
    _UNAUTHORIZED: 401,
    _NOT_FOUND: 404,
  },
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 22/03/2023
   * @descriptionKey TIME OUT
   * @return {number}
   */
  TIME_OUT_AXIOS: 3000,
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 22/03/2023
   * @descriptionKey Type data
   * @return {*}
   */
  DATA: {
    _NULL: 'null',
  },
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 22/03/2023
   * @descriptionKey Name redux thunk
   * @return {string}
   */
  REDUX_NAME: {
    _AUTH: 'AUTH ADMIN',
    _BOOK: 'BOOK ADMIN',
    _MEDIA: 'MEDIA CLOUD',
  },
  MEDIA_TYPE: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    FILE: 'file',
  },
  EXCEL_TYPE: 'xlsx',

  defaultImageAuthor:
    'https://res.cloudinary.com/dfupi3m0b/image/upload/v1679983323/library_school_image/images/1467365270468165634/1668798157976240128/1679983321408-user.png',
};
export default CONSTANTS;
