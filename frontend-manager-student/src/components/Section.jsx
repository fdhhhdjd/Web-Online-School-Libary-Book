import React from 'react';
import { Link } from 'react-router-dom';

const Section = (props) => {
  return <div className="section">{props.children}</div>;
};

export const SectionTitle = (props) => {
  return (
    <div className={`section__title ${props.left ? 'left' : 'center'}`}>
      <span>{props.children}</span>
      {props.subTitle && (
        <Link to="/">
          {props.subTitle} <i className="bx bx-chevron-right"></i>
        </Link>
      )}
    </div>
  );
};

export const SectionBody = (props) => {
  return <div className="section__body">{props.children}</div>;
};

export default Section;
