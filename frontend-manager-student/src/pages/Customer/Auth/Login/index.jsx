import './style.scss';

const Login = ({ showLogin, setShowLogin }) => {
  return (
    <div id="Auth" className={showLogin ? 'show' : ''}>
      <div href="hello" className="close-btn" onClick={(e) => setShowLogin(false)} style={{ cursor: 'pointer' }}>
        <i className="fas fa-times"></i>
      </div>
      <div className="content">
        <div className="login">
          <strong>Sign In</strong>
          <form action="">
            <label htmlFor="">
              Student ID <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="far fa-id-card"></i>
              <input type="text" name="" id="email" required />
            </div>

            <label htmlFor="">
              Password <span>*</span>
            </label>
            <div className="iq-input-group">
              <i className="fas fa-lock"></i>
              <input type="password" name="" id="password" required />
            </div>
            <div className="btns">
              <button type="submit">Login</button>
            </div>
            <a href="helo" className="forget">
              Forgot Your Password
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
