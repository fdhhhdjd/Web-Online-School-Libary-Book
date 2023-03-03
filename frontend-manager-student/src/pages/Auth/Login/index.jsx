//!LIBRARY
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//! REDUX THUNK
import { Login_Mssv_Initial } from 'redux/student/authentication_slice/auth_thunk';
import NOTIFICATION from 'utils/notification';

//! SHARE
import { useEffect } from 'react';
import HELPERS from 'utils/helper';

const Login = ({ showLogin, setShowLogin }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth_user.student_auth?.element?.result);

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.mssv || !values.password) {
      return NOTIFICATION.notifyError('Mssv or Password required !!!');
    }

    // Action Login
    dispatch(Login_Mssv_Initial(values));
  };

  useEffect(() => {
    if (currentUser?.access_token) {
      setShowLogin(false);
    }
  }, [currentUser, setShowLogin]);

  return (
    <div id="Auth" className={showLogin ? 'show' : ''}>
      <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
        <i className="fas fa-times"></i>
      </div>
      <div className="content">
        <div className="login">
          <strong>Đăng nhập</strong>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
              Mã số sinh viên <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="far fa-id-card"></i>
              <input type="text" name="mssv" id="mssv" required />
            </div>

            <label htmlFor="">
              Mật khẩu <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" id="password" required />
            </div>
            <div className="btns">
              <button type="submit">Đăng nhập</button>
            </div>
            <Link to="/forget" className="forget">
              Quên mật khẩu?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
