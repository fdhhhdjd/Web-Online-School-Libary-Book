import Helmet from 'components/Helmet';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import { Col, Row } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <Helmet title="Thông tin tài khoản">
      <div className="main">
        <Section>
          <SectionTitle>Thông tin tài khoản</SectionTitle>
          <SectionBody>
            <Row>
              <Col></Col>
            </Row>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default UserProfile;
