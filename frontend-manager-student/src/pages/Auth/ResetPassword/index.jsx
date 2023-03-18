//! LIBRARY
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENTS
import Section, { SectionBody, SectionTitle } from 'components/Section';

//! SHARE

//! REDUX THUNK

//!IMPORT
import { Loading } from 'imports/loading_import';
import Helmet from 'components/Helmet';
import { useParams } from 'react-router-dom';
import { Reset_Password_Initial } from 'redux/student/authentication_slice/auth_thunk';

const ResetPassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Take profile account in store
  const { loading_change_password } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const handleChangePasswordStudent = (data) => {
    console.log(data);

    // Action Change Password
    dispatch(Reset_Password_Initial({ id, ...data }));
  };

  return (
    <Helmet title="Reset Password">
      <div className="reset-password main">
        <Section>
          <SectionTitle>Reset mật khẩu</SectionTitle>
          <SectionBody>
            <form onSubmit={handleSubmit(handleChangePasswordStudent)}>
              <div className="reset-password__form">
                <label htmlFor="new_pass">Nhập mật khẩu mới: </label>
                <div className="input-group-effect">
                  <div>
                    <input
                      className="effect-9"
                      type="password"
                      name="password"
                      id="new_pass"
                      placeholder="Mật khẩu mới ..."
                      {...register('password', {
                        required: true,
                      })}
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="error-msg">
                  {errors?.password?.type === 'required' ? 'Mời bạn nhập mật khẩu mới' : ''}
                </div>

                <label htmlFor="new_pass_conf">Xác nhận mật khẩu mới: </label>
                <div className="input-group-effect">
                  <div>
                    <input
                      id="new_pass_conf"
                      className="effect-9"
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      {...register('confirmPassword', {
                        required: true,
                      })}
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="error-msg">
                  {errors?.confirmPassword?.type === 'required' ? 'Mời bạn xác nhận mật khẩu mới' : ''}
                </div>
                {loading_change_password ? (
                  <Loading />
                ) : (
                  <button type="submit" className="submit-btn">
                    Xác nhận mật khẩu
                  </button>
                )}
              </div>
            </form>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default ResetPassword;
