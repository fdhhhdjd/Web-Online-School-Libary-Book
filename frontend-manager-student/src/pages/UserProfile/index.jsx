import Helmet from 'components/Helmet';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import { Col, Row } from 'react-bootstrap';

const UserProfile = () => {
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
                      <Col md={4}>Hello</Col>
                      <Col md={8}>Hello</Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col md={9}>
                <div className="profile__info">Hello</div>
              </Col>
            </Row>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default UserProfile;
