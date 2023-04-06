//!LIBRARY
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';

//! CUSTOMER HOOK
import useUploadCloud from 'custom_hook/useUpload/uploadMediaCloud';

//!IMPORT
import { Loading } from 'imports/loading_import';
import moment from 'moment/moment';
import { Update_Student_Initial } from 'redux/student/authentication_slice/auth_thunk';

const UserInfo = () => {
  //Store Profile
  const dispatch = useDispatch();
  const { profile_student } = useSelector((state) => ({
    ...state.auth_student,
  }));

  //Store Media
  const { result_upload, loading_media } = useSelector((state) => ({
    ...state.media,
  }));

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);

  //File custom hook media
  const { handleUpload } = useUploadCloud();

  // Update Profile Func
  const updateProfile = (result) => {
    const data = {
      ...result,
      dob: moment(dob || profile_student?.dob).format('YYYYMMDD'),
      gender: gender.toString(),
      avatar_uri: result_upload?.result?.url || profile_student?.data?.avatar_uri,
    };
    dispatch(Update_Student_Initial(data));
  };

  useEffect(() => {
    setGender(profile_student?.data?.gender);
    reset(profile_student?.data);
  }, [profile_student]);

  return (
    <React.Fragment>
      <div className="profile__info">
        <div className="profile__info__title">Thông tin tài khoản</div>
        <div className="profile__info__description">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className="profile__info__content">
        <Row>
          <Col md={8}>
            <div className="info_border">
              <div md={4} className="profile__info__content__label">
                <div className="content-input">
                  <div className="profile__info__content__label-item">Họ và Tên</div>
                  <div className="profile__info__content__input-item">
                    <input
                      type="text"
                      defaultValue={profile_student?.data?.name}
                      className={`input-user ${errors?.name?.type === 'required' ? 'error-input' : ''}`}
                      {...register('name', {
                        required: true,
                      })}
                    />
                    <div className="error-msg">
                      {errors?.name?.type === 'required' ? 'Tên vui lòng không để trống' : ''}
                    </div>
                  </div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Mã số sinh viên</div>
                  <div className="profile__info__content__input-item">{profile_student?.data?.mssv}</div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Email</div>
                  <div className="profile__info__content__input-item">{profile_student?.data?.email}</div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Địa chỉ</div>
                  <div className="profile__info__content__input-item">
                    <input
                      type="text"
                      defaultValue={profile_student?.data?.address}
                      className={`input-user ${errors?.address?.type === 'required' ? 'error-input' : ''}`}
                      {...register('address', {
                        required: true,
                      })}
                    />
                    <div className="error-msg">
                      {errors?.address?.type === 'required' ? 'Địa chỉ vui lòng không để trống' : ''}
                    </div>
                  </div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Số điện thoại</div>
                  <div className="profile__info__content__input-item">{profile_student?.data?.phone_hidden}</div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Giới tính</div>
                  <div className="profile__info__content__input-item">
                    <span>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        checked={gender === 1}
                        onChange={() => setGender(1)}
                      />
                      <label htmlFor="male">Nam</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        checked={gender === 2}
                        onChange={() => setGender(2)}
                      />
                      <label htmlFor="female">Nữ</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        name="gender"
                        id="more"
                        checked={gender === 3}
                        onChange={() => setGender(3)}
                      />
                      <label htmlFor="more">Khác</label>
                    </span>
                  </div>
                </div>

                <div className="content-input">
                  <div className="profile__info__content__label-item">Ngày sinh</div>
                  {profile_student?.data?.dob && (
                    <Calendar
                      defaultValue={new Date(moment(profile_student?.data.dob).format())}
                      onChange={setDob}
                      value={new Date(moment(profile_student?.data.dob).format())}
                    />
                  )}
                </div>

                <div className="profile__info__content__input-item">
                  <button className="profile__info__submit-btn" onClick={handleSubmit(updateProfile)}>
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="profile__info__image">
              <div className="profile__info__image__preview">
                {loading_media ? (
                  <Loading />
                ) : (
                  <img src={result_upload ? result_upload?.result?.url : profile_student?.data?.avatar_uri} alt="" />
                )}
              </div>
              <input type="file" name="file" id="avatar" className="hidden" onChange={handleUpload} />
              <label htmlFor="avatar">Chọn ảnh</label>
              <div className="profile__info__image__preview__require">
                Dung lượng file tối đa 1 MB
                <br />
                Định dạng: .JPG, .JPEG, .PNG
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default UserInfo;
