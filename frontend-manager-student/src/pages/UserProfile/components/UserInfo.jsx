//!LIBRARY
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DayPicker, MonthPicker, YearPicker } from 'react-dropdown-date';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

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
  } = useForm();

  // date picking setting
  const [date, setDate] = useState({ year: '', month: '', day: '' });
  const [gender, setGender] = useState(null);

  //File custom hook media
  const { handleUpload } = useUploadCloud();

  // Update Profile Func
  const updateProfile = (result) => {
    const data = { ...result, gender, avatar_uri: result_upload?.result?.url || profile_student?.data?.avatar_uri };
    dispatch(Update_Student_Initial(data));
  };

  console.log(result_upload, loading_media);

  useEffect(() => {
    setGender(profile_student?.data?.gender);
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
            <Row className="info_border">
              <Col md={4} className="profile__info__content__label">
                <div className="profile__info__content__label-item">Họ và Tên</div>
                <div className="error-msg">
                  {errors?.name?.type === 'required' && <i className="bx bx-error-alt"></i>}
                </div>
                <div className="profile__info__content__label-item">Mã số sinh viên</div>
                <div className="profile__info__content__label-item">Email</div>
                <div className="profile__info__content__label-item">Địa chỉ</div>
                <div className="error-msg">
                  {errors?.address?.type === 'required' && <i className="bx bx-error-alt"></i>}
                </div>

                <div className="profile__info__content__label-item">Số điện thoại</div>
                <div className="profile__info__content__label-item">Giới tính</div>
                <div className="profile__info__content__label-item">Ngày sinh</div>
                <div className="profile__info__content__label-item" onClick={handleSubmit(updateProfile)}>
                  <button>Lưu</button>
                </div>
              </Col>
              <Col md={8} className="profile__info__content__input">
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
                <div className="profile__info__content__input-item">{profile_student?.data?.mssv}</div>
                <div className="profile__info__content__input-item">{profile_student?.data?.email}</div>
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
                <div className="profile__info__content__input-item">{profile_student?.data?.phone_hidden}</div>
                <div className="profile__info__content__input-item">
                  <span>
                    <input type="radio" name="gender" id="male" checked={gender === 1} onChange={() => setGender(1)} />
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
                    <input type="radio" name="gender" id="more" checked={gender === 3} onChange={() => setGender(3)} />
                    <label htmlFor="more">Khác</label>
                  </span>
                </div>

                <div className="date-picker">
                  <DayPicker
                    defaultValue={moment(profile_student?.data?.dob).date()}
                    year={date.year} // mandatory
                    month={date.month} // mandatory
                    endYearGiven // mandatory if end={} is given in YearPicker
                    value={date.day} // mandatory
                    onChange={(day) => {
                      // mandatory
                      setDate((prev) => ({ ...prev, day }));
                    }}
                    id={'day'}
                    classes={`dropdown-date `}
                    optionClasses={'option'}
                  />

                  <MonthPicker
                    defaultValue={moment(profile_student?.data?.dob).month() + 1}
                    numeric // to get months as numbers
                    endYearGiven // mandatory if end={} is given in YearPicker
                    year={date.year} // mandatory
                    value={date.month} // mandatory
                    onChange={(month) => {
                      // mandatory
                      setDate((prev) => ({ ...prev, month }));
                    }}
                    id={'month'}
                    classes={`dropdown-date`}
                    optionClasses={'option'}
                  />

                  <YearPicker
                    defaultValue={moment(profile_student?.data?.dob).year()}
                    start={1980} // default is 1900
                    end={2023} // default is current year
                    reverse // default is ASCENDING
                    value={date.year} // mandatory
                    onChange={(year) => {
                      // mandatory
                      setDate((prev) => ({ ...prev, year }));
                    }}
                    id={'year'}
                    classes={`dropdown-date`}
                    optionClasses={'option'}
                  />
                </div>
              </Col>
            </Row>
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
