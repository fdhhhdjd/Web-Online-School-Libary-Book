import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { profile_student } = useSelector((state) => ({
    ...state.auth_student,
  }));

  // date picking setting
  const [date, setDate] = useState({ year: '', month: '', day: '' });
  const [gender, setGender] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(profile_student?.data?.avatar_uri);
      return;
    }

    // get first image
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setGender(profile_student?.data?.gender);
    setPreview(profile_student?.data?.avatar_uri);
  }, [profile_student]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(profile_student?.data?.avatar_uri);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, profile_student?.data?.avatar_uri]);

  return (
    <>
      <div className="profile__info">
        <div className="profile__info__title">Thông tin tài khoản</div>
        <div className="profile__info__description">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className="profile__info__content">
        <Row>
          <Col md={8}>
            <Row className="info_border">
              <Col md={3} className="profile__info__content__label">
                <div className="profile__info__content__label-item">Họ và Tên</div>
                <div className="profile__info__content__label-item">Mã số sinh viên</div>
                <div className="profile__info__content__label-item">Email</div>
                <div className="profile__info__content__label-item">Số điện thoại</div>
                <div className="profile__info__content__label-item">Giới tính</div>
                <div className="profile__info__content__label-item">Ngày sinh</div>
                <div className="profile__info__content__label-item">
                  <button>Lưu</button>
                </div>
              </Col>
              <Col md={9} className="profile__info__content__input">
                <div className="profile__info__content__input-item">{profile_student?.data?.name}</div>
                <div className="profile__info__content__input-item">{profile_student?.data?.mssv}</div>
                <div className="profile__info__content__input-item">{profile_student?.data?.email}</div>
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
                    defaultValue={'DD'}
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
                    defaultValue={'MM'}
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
                    defaultValue={'YYYY'}
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
                <img src={preview} alt="" />
              </div>
              <input type="file" id="avatar" onChange={onSelectFile} className="hidden" />
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
    </>
  );
};

export default UserInfo;