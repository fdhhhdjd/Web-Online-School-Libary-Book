//! LIBRARY
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! DUMMY DATA
import { profileSidebar } from 'utils/dummy';

const Sidebar = ({ pathName, profile_student }) => {
  return (
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
                <Link to="/user/profile">
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
  );
};

export default Sidebar;
