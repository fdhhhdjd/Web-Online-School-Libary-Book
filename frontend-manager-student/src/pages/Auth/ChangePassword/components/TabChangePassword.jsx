//! LIBRARY
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENTS
import Section, { SectionBody, SectionTitle } from 'components/Section';

//! SHARE

//! REDUX THUNK
import { Change_Password_Initial } from 'redux/student/authentication_slice/auth_thunk';

//!IMPORT
import { Loading } from 'imports/loading_import';

const TabChangePassword = () => {
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
    dispatch(Change_Password_Initial(data));
  };

  return (
    <React.Fragment>
      <div className="change-password main">
        <Section>
          <SectionTitle>Thay đổi mật khẩu</SectionTitle>
          <SectionBody>
            <form onSubmit={handleSubmit(handleChangePasswordStudent)}>
              <div className="change-password__form">
                <label htmlFor="old_pass">Nhập mật khẩu cũ: </label>
                <div className="input-group-effect">
                  <div>
                    <input
                      id="old_pass"
                      className="effect-9"
                      name="oldPassword"
                      type="password"
                      placeholder="Mật khẩu cũ ..."
                      {...register('oldPassword', {
                        required: true,
                      })}
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="error-msg">
                  {errors?.oldPassword?.type === 'required' ? 'Mời bạn nhập mật khẩu cũ' : ''}
                </div>

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
                    Đổi mật khẩu
                  </button>
                )}
              </div>
            </form>
          </SectionBody>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default TabChangePassword;
