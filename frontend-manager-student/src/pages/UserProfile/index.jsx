//! LIBRARY
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

//! COMPONENT
import Helmet from 'components/Helmet';
import Section, { SectionBody, SectionTitle } from 'components/Section';

//! SHARE
import Sidebar from './components/Sidebar';

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
                <Sidebar pathName={pathName} profile_student={profile_student} />
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
