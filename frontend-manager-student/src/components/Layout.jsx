import Header from 'components/Header';
import Login from 'pages/Auth/Login';
import React, { useState } from 'react';
import Footer from './Footer';

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
