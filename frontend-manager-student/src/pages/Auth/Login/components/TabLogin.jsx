//!LIBRARY
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! REDUX THUNK
import { Login_Mssv_Initial } from 'redux/student/authentication_slice/auth_thunk';

//! SHARE
import NOTIFICATION from 'utils/notification';
import HELPERS from 'utils/helper';

//! IMPORT
import { TabForgetPassword } from 'imports/auth_import';
const TabLogin = ({ showLogin, setShowLogin }) => {
  const dispatch = useDispatch();

  //Store Student
  const { loading_login } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const [forgetPage, setForgetPage] = useState(false);

  const handleLoginStudent = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.mssv || !values.password) {
      return NOTIFICATION.notifyError('Mã số sinh viên hoặc mật khẩu không chính xác !!!');
    }

    // Action Login
    dispatch(Login_Mssv_Initial(values));
  };
  return (
    <React.Fragment>
      <div id="Auth" className={showLogin ? 'show' : ''}>
        {!forgetPage ? (
          <>
            <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
              <i className="fas fa-times"></i>
            </div>
            <div className="content">
              <div className="login">
                <strong>Đăng nhập</strong>
                <form action="" onSubmit={handleLoginStudent}>
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
                    {loading_login ? <p>Loading...</p> : <button type="submit">Đăng nhập</button>}
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
            <TabForgetPassword setShowLogin={setShowLogin} setForgetPage={setForgetPage} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default TabLogin;
