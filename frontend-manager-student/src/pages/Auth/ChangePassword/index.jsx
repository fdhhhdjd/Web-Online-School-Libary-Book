//! LIBRARY
import React from 'react';

//! COMPONENT
import Helmet from 'components/Helmet';

//! IMPORT
import { TabChangePassword } from 'imports/auth_import';

const ChangePassword = () => {
  return (
    <Helmet title="Đổi mật khẩu">
      <TabChangePassword />
    </Helmet>
  );
};

export default ChangePassword;
