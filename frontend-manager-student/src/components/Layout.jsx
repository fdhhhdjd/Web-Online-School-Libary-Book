//! LIBRARY
import React, { useState } from 'react';

//! PAGE
import Login from 'pages/Auth/Login';
import Footer from './Footer';

//! COMPONENTS
import Header from 'components/Header';
import { useContext } from 'react';
import { store_library_school_contextUser } from 'contexts/global_context';

const Layout = (props) => {
  const dataContext = useContext(store_library_school_contextUser);
  const [showLogin, setShowLogin] = dataContext.login;

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
