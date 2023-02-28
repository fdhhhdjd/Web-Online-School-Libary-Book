import Dropdown from 'components/Dropdown';
import Section, { SectionBody } from 'components/Section';
import React from 'react';
import { Helmet } from 'react-helmet';

const Book = () => {
  return (
    <Helmet title="Tài liệu">
      <Section>
        <SectionBody>
          <Dropdown />
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Book;
