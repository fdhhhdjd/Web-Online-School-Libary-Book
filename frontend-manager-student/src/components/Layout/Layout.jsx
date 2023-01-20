import Login from 'pages/Customer/Auth/Login';
import React, { useState } from 'react';
import NavBar from './Navbar';
import Sidebar from './Sidebar';
import './style.scss';

const Layout = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <Sidebar />
      <NavBar setShowLogin={setShowLogin} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <div id="content-page" className="content-page">
        {props?.content}
      </div>
    </>
  );
};

export default Layout;
