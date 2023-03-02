import { Link } from 'react-router-dom';

const Login = ({ showLogin, setShowLogin }) => {
  return (
    <div id="Auth" className={showLogin ? 'show' : ''}>
      <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
        <i className="fas fa-times"></i>
      </div>
      <div className="content">
        <div className="login">
          <strong>Đăng nhập</strong>
          <form action="">
            <label htmlFor="">
              Mã số sinh viên <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="far fa-id-card"></i>
              <input type="text" name="" id="email" required />
            </div>

            <label htmlFor="">
              Mật khẩu <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="fas fa-lock"></i>
              <input type="password" name="" id="password" required />
            </div>
            <div className="btns">
              <button type="submit">Đăng nhập</button>
            </div>
            <Link to="/helo" className="forget">
              Quên mật khẩu?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
