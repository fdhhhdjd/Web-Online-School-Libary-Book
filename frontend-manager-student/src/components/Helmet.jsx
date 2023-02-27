import React, { useEffect } from 'react';
import propTypes from 'prop-types';

const Helmet = (props) => {
  document.title = 'ITC - ' + props.title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

Helmet.propTypes = {
  title: propTypes.string.isRequired,
};

export default Helmet;
