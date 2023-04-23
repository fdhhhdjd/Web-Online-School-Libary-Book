//!LIBRARY
import jwt_decode from 'jwt-decode';

//! SHARE
import CONSTANTS from 'configs/constants';
import moment from 'moment';
import { Borrow_Book_Student_Initial } from 'redux/student/borrow_book_slice/borrow_thunk';
import Swal from 'sweetalert2';
import { getDeviceId, getToken } from './auth';
import REGEX from './regex';
import { Add_Favorite_Initial } from 'redux/student/favorite_slice/favorite_thunk';

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
   * @created_at 15/03/2023
   * @descriptionKey return header media
   * @function getToken
   * @return {String}
   */
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
      headers.athorization = token ? `Bearer ${token}` : null;
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
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 16/03/2023
   * @description from String template to URI
   * @param {template,data}
   * @returns {string}
   */
  getURIFromTemplate(template, data) {
    return template.replace(REGEX.REGEX_IS_STRING_PARAM, (_, key) => data[key]);
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 19/03/2023
   * @description Del input
   * @param {e}
   */
  delInputSuccess(e) {
    // Del input
    return e.target.reset();
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 22/03/2023
   * @description Get execute time
   * @param {start, end}
   */
  getExecuteTimeSecond(start, end) {
    return ((end - start) / 1000).toFixed(5);
  },

  formatTimeWithHour: (time) => {
    return moment(time).format('DD-MM-YYYY, h:mm:ss a');
  },

  formatTimeWithDate: (time) => {
    return moment(time).format('DD-MM-YYYY');
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 06/04/2023
   * @description Get execute time
   * @param {start, end}
   */

  getStatusBorrow: (status, dueDate) => {
    const today = moment().format();
    const dueDateFormat = moment(dueDate).diff(today, 'days');
    switch (status) {
      case 10:
        return {
          label: 'Chờ xác nhận',
          className: 'pending',
        };
      case 20:
        return {
          label: `Đang mượn, còn ${dueDateFormat} ngày`,
          className: 'borrowing',
        };
      case 30:
        return {
          label: 'Đã trả',
          className: 'refund',
        };
      case 40:
        return {
          label: 'Quá hạn',
          className: 'expired',
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
          className: 'blue',
        };
      }
      default:
        return 'Chưa xác định';
    }
  },

  /**
   * @author Nguyễn Tiến Tài
   * @created_at 10/04/2023
   * @description Handle borrow book
   * @param {detailBook, quantity, dispatch}
   */
  handleBorrowBook: (detailBook, quantity, dispatch) => {
    Swal.fire({
      title: 'Xác nhận đăng kí mượn sách',
      text: 'Ấn "Xác nhận" để đăng kí mượn sách này',
      icon: 'warning',
      customClass: 'swal-wide',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        if ((detailBook?.quantity_book || detailBook?.quantity) > 0) {
          dispatch(Borrow_Book_Student_Initial({ book_id: detailBook.book_id, quantity })).then((result) => {
            if (result?.payload?.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi xử lý',
                customClass: 'swal-wide',
                text: result?.payload?.element?.result,
              });
            } else {
              Swal.fire({
                title: 'Đăng kí mượn sách thành công',
                text: 'Bạn có 24 giờ kể từ thời gian đăng kí mượn để lên thư viện ITC nhận sách. \n Nếu sau 24 giờ vẫn chưa lấy sách thì xem như đã hủy mượn sách',
                icon: 'success',
                customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Xác nhận',
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi xử lý',
            customClass: 'swal-wide',
            text: 'Sách này hiện tại đã hết',
          });
        }
      }
    });
  },

  handleFavoriteBook: (book_id, dispatch) => {
    Swal.fire({
      title: 'Thêm vào danh sách yêu thích?',
      text: 'Bạn có muốn thêm quyển sách này vào danh sách yêu thích ?',
      icon: 'warning',
      customClass: 'swal-wide',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(Add_Favorite_Initial({ book_id }));
      }
    });
  },

  mergeCommentArray: (commentList) => {
    // eslint-disable-next-line array-callback-return
    const mainCommentList = [];
    const subCommentList = [];

    if (commentList) {
      for (const item of commentList) {
        if (item.parent_slug === '') {
          mainCommentList.push({ ...item, sub_comment: [] });
        } else {
          subCommentList.push(item);
        }
      }
    }

    subCommentList?.forEach((sub) => {
      mainCommentList?.forEach((main) => {
        if (sub?.parent_slug === main?.slug) {
          main.sub_comment.push(sub);
        }
      });
    });

    return mainCommentList;
  },

  getDiffTimeComment: (commentDate) => {
    console.log(commentDate);
  },

  sliceComment: (commentList, amount) => {
    return commentList.slice(0, amount);
  },

  countMainComment: (commentList) => {
    return commentList?.filter((item) => item.parent_slug === '').length;
  },
};

export default HELPERS;
