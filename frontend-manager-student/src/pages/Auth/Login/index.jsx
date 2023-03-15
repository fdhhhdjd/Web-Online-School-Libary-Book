//!LIBRARY
import { useDispatch } from 'react-redux';

//! REDUX THUNK
import { Login_Mssv_Initial } from 'redux/student/authentication_slice/auth_thunk';
import NOTIFICATION from 'utils/notification';

//! SHARE
import { useState } from 'react';
import HELPERS from 'utils/helper';

const Login = ({ showLogin, setShowLogin }) => {
  const dispatch = useDispatch();
  const [forgetPage, setForgetPage] = useState(false);
  // console.log('re-render');

  const handleLogin = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.mssv || !values.password) {
      return NOTIFICATION.notifyError('Mã số sinh viên hoặc mật khẩu không chính xác !!!');
    }

    // Action Login
    dispatch(Login_Mssv_Initial(values));
  };

  const handleSendMail = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.email) {
      return NOTIFICATION.notifyError('Vui lòng nhập Email');
    }

    // Action Login
    dispatch(Login_Mssv_Initial(values));
  };

  return (
    <div id="Auth" className={showLogin ? 'show' : ''}>
      {!forgetPage ? (
        <>
          <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </div>
          <div className="content">
            <div className="login">
              <strong>Đăng nhập</strong>
              <form action="" onSubmit={handleLogin}>
                <label htmlFor="">
                  Mã số sinh viên <span>*</span>
                </label>
                <div className="iq-input-group">
                  <i className="far fa-id-card"></i>
                  <input type="text" name="mssv" id="mssv" />
                </div>

                <label htmlFor="">
                  Mật khẩu <span>*</span>
                </label>
                <div className="iq-input-group">
                  <i className="fas fa-lock"></i>
                  <input type="password" name="password" id="password" />
                </div>
                <div className="btns">
                  <button type="submit">Đăng nhập</button>
                </div>
                <span className="forget" onClick={() => setForgetPage(true)}>
                  Quên mật khẩu?
                </span>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </div>
          <div className="content">
            <div className="login">
              <strong>Quên mật khẩu</strong>
              <form action="" onSubmit={handleSendMail}>
                <label htmlFor="">
                  Email <span>*</span>
                </label>
                <div className="iq-input-group">
                  <i className="far fa-id-card"></i>
                  <input type="text" name="email" id="email" />
                </div>

                <div className="btns">
                  <button type="submit">Xác nhận</button>
                </div>
                <span className="forget" onClick={() => setForgetPage(false)}>
                  Quay lại trang đăng nhập
                </span>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
