import Header from 'components/Header';
import React from 'react';

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.content}
    </>
  );
};

export default Layout;
