//! LIBRARY
import React, { useState } from 'react';

//! PAGE
import Login from 'pages/Auth/Login';
import Footer from './Footer';

//! COMPONENTS
import Header from 'components/Header';

const Layout = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header setShowLogin={setShowLogin} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      {props.content}
      <Footer />
    </>
  );
};

export default Layout;
