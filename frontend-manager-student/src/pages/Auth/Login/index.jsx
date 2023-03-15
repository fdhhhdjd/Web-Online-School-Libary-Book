//! LIBRARY
import React from 'react';

//! IMPORT
import { TabLogin } from 'imports/auth_import';

const Login = ({ showLogin, setShowLogin }) => {
  return (
    <React.Fragment>
      <TabLogin showLogin={showLogin} setShowLogin={setShowLogin} />
    </React.Fragment>
  );
};

export default Login;
