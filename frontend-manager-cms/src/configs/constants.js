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
  DELETED_ENABLE: false,
  DELETED_DISABLE: true,

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
};
export default CONSTANTS;
