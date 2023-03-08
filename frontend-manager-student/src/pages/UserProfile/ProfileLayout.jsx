import Helmet from 'components/Helmet';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { profileSidebar } from 'utils/dummy';

const UserProfile = (props) => {
  // Take profile account in store
  const { profile_student } = useSelector((state) => ({
    ...state.auth_student,
  }));
  const pathName = useLocation().pathname;

  return (
    <Helmet title="Thông tin tài khoản">
      <div className="main profile">
        <Section>
          <SectionTitle>Thông tin tài khoản</SectionTitle>
          <SectionBody>
            <Row>
              <Col md={3}>
                <div className="profile__sidebar">
                  <div className="profile__sidebar__user">
                    <Row>
                      <Col md={2}>
                        <div className="profile__sidebar__user__image">
                          <img src={profile_student?.data?.avatar_uri} alt="" />
                        </div>
                      </Col>
                      <Col md={10}>
                        <div className="profile__sidebar__user__info">
                          <div>{profile_student?.data?.name}</div>
                          <div>
                            <Link to="">
                              <i className="bx bxs-edit-alt"></i> Sửa hồ sơ
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="profile__sidebar__list">
                    {profileSidebar.map((item, idx) => (
                      <div className="profile__sidebar__list__item" key={idx}>
                        <Link to={item.path}>
                          <i className={item.icon}></i>
                          <span className={`${pathName === item.path ? 'active' : ''}`}>{item.displayText}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={9}>{props.content}</Col>
            </Row>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default UserProfile;
