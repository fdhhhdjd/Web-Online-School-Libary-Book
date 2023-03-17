//! LIBRARY
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
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
      position: toast.POSITION.TOP_RIGHT,
      autoClose: CONSTANTS.AUTO_CLOSE,
      hideProgressBar: CONSTANTS.DELETED_DISABLE,
      closeOnClick: CONSTANTS.DELETED_ENABLE,
      pauseOnHover: CONSTANTS.DELETED_ENABLE,
      draggable: CONSTANTS.DELETED_ENABLE,
    });
  },

  /**
   * @author Châu Gia Bảo
   * @created_at 16/03/2023
   * @descriptionKey success
   */
  swalSuccess(title, text) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      customClass: 'swal-wide',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận',
    });
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey error
   */
  notifyError(message) {
    return toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: CONSTANTS.AUTO_CLOSE,
      hideProgressBar: CONSTANTS.DELETED_DISABLE,
      closeOnClick: CONSTANTS.DELETED_ENABLE,
      pauseOnHover: CONSTANTS.DELETED_ENABLE,
      draggable: CONSTANTS.DELETED_ENABLE,
    });
  },
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 15/03/2023
   * @descriptionKey login session expired
   */
  swalLoginSessionExpired(message) {
    Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đăng nhập lại',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
      }
    });
  },
};
export default NOTIFICATION;
