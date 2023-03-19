//! LIBRARY
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//! COMPONENTS
import Section, { SectionBody, SectionTitle } from 'components/Section';

//! IMPORT
import { Loading } from 'imports/loading_import';

//! SHARE
import CONSTANTS from 'configs/constants';

//! REDUX
import { Reset_Password_Initial } from 'redux/student/authentication_slice/auth_thunk';
import Navigate from 'custom_hook/useNavigate/Navigate';

const TabResetPassword = () => {
  // Param id
  const { id } = useParams();

  //create dispatch action event
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Take profile account in store
  const { loading_reset_password } = useSelector((state) => ({
    ...state.auth_student,
  }));
  const { navigateChangePage } = Navigate();

  const handleChangePasswordStudent = (data, e) => {
    // Action Change Password
    dispatch(Reset_Password_Initial({ id, ...data, e })).then((response) => {
      if (response.payload.status === CONSTANTS.STATUS._OK) {
        setTimeout(() => {
          navigateChangePage('/');
        }, CONSTANTS._2_SECOND);
      }
    });
  };

  return (
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
              {loading_reset_password ? (
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
  );
};

export default TabResetPassword;
