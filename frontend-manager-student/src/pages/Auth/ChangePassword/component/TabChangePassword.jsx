//! LIBRARY
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENTS
import Section, { SectionBody, SectionTitle } from 'components/Section';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';

//! REDUX THUNK
import { Change_Password_Initial } from 'redux/student/authentication_slice/auth_thunk';

//!IMPORT
import { Loading } from 'imports/loading_import';

const TabChangePassword = () => {
  const dispatch = useDispatch();

  // Take profile account in store
  const { loading_change_password } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const handleChangePasswordStudent = (e) => {
    e.preventDefault();

    const values = HELPERS.formDataGeneral(e.target);

    //Check input
    if (!values.password || !values.oldPassword || !values.confirmPassword) {
      return NOTIFICATION.notifyError('Các trường không được để trống !!!');
    }

    // Action Change Password
    dispatch(Change_Password_Initial(values));
  };
  return (
    <React.Fragment>
      <div className="change-password main">
        <Section>
          <SectionTitle>Thay đổi mật khẩu</SectionTitle>
          <SectionBody>
            <form onSubmit={handleChangePasswordStudent}>
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
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
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
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
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
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
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
