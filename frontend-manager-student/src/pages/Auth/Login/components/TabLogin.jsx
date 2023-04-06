//!LIBRARY
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! REDUX THUNK
import { Login_Mssv_Initial } from 'redux/student/authentication_slice/auth_thunk';

//! SHARE

//! IMPORT
import { TabForgetPassword } from 'imports/auth_import';
import Loading from 'components/Loading';

const TabLogin = ({ showLogin, setShowLogin }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Store Student
  const { loading_login } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const [forgetPage, setForgetPage] = useState(false);

  const handleLoginStudent = (data) => {
    console.log(data);
    //Check input
    if (!data.mssv || !data.password) {
      return;
    }
    // Action Login
    dispatch(Login_Mssv_Initial(data));
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
                <form action="" onSubmit={handleSubmit(handleLoginStudent)}>
                  <label htmlFor="">
                    Mã số sinh viên <span>*</span>
                  </label>
                  <div className="iq-input-group">
                    <i className="far fa-id-card"></i>
                    <input
                      type="text"
                      name="mssv"
                      id="mssv"
                      {...register('mssv', {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="error-msg">
                    {errors?.mssv?.type === 'required' ? 'Mời bạn nhập mã số sinh viên' : ''}
                  </div>

                  <label htmlFor="">
                    Mật khẩu <span>*</span>
                  </label>
                  <div className="iq-input-group">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      {...register('password', {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="error-msg">
                    {errors?.password?.type === 'required' ? 'Mời bạn nhập mật khẩu' : ''}
                  </div>

                  <div className="btns">{loading_login ? <Loading /> : <button type="submit">Đăng nhập</button>}</div>
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
