//! LIBRARY
import { toast } from 'react-toastify';

//! SHARE
import CONSTANTS from 'configs/constants';

const NOTIFICATION = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey success
   */
  notifySuccess(message) {
    return toast.success(message, {
      pposition: toast.POSITION.TOP_RIGHT,
      autoClose: CONSTANTS.AUTO_CLOSE,
      hideProgressBar: CONSTANTS.DELETED_DISABLE,
      closeOnClick: CONSTANTS.DELETED_ENABLE,
      pauseOnHover: CONSTANTS.DELETED_ENABLE,
      draggable: CONSTANTS.DELETED_ENABLE,
    });
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey error
   */
  notifyError(message) {
    console.log(message);
    return toast.error(message, {
      pposition: toast.POSITION.TOP_RIGHT,
      autoClose: CONSTANTS.AUTO_CLOSE,
      hideProgressBar: CONSTANTS.DELETED_DISABLE,
      closeOnClick: CONSTANTS.DELETED_ENABLE,
      pauseOnHover: CONSTANTS.DELETED_ENABLE,
      draggable: CONSTANTS.DELETED_ENABLE,
    });
  },
};
export default NOTIFICATION;
