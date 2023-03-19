//! LIBRARY
import React from 'react';

//! IMPORT
import { TabResetPassword } from 'imports/auth_import';

//! COMPONENTS
import Helmet from 'components/Helmet';

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Helmet title="Reset Password">
        <TabResetPassword />
      </Helmet>
    </React.Fragment>
  );
};

export default ResetPassword;
