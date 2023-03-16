//!LIBRARY
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';

//!REDUX THUNK
import { Forget_Password_Initial } from 'redux/student/authentication_slice/auth_thunk';

//!IMPORT
import {Loading} from 'imports/loading_import'

const TabForgetPassword = ({ setShowLogin, setForgetPage }) => {
  const dispatch = useDispatch();

  //Store Student
  const { loading_forget_password } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const handleForgetStudent = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.email) {
      return NOTIFICATION.notifyError('Email Không được bỏ trống !!!');
    }

    // Action Login
    dispatch(Forget_Password_Initial(values));
  };
  return (
    <React.Fragment>
      <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
        <i className="fas fa-times"></i>
      </div>
      <div className="content">
        <div className="login">
          <strong>Quên mật khẩu</strong>
          <form onSubmit={handleForgetStudent}>
            <label htmlFor="">
              Email <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="far fa-id-card"></i>
              <input type="text" name="email" id="email" />
            </div>

            <div className="btns">
              {loading_forget_password ? <Loading/> : <button type="submit">Xác nhận</button>}
            </div>
            <span className="forget" onClick={() => setForgetPage(false)}>
              Quay lại trang đăng nhập
            </span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TabForgetPassword;
