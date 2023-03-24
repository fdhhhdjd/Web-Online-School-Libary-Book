//! LIBRARY
import CONSTANTS from 'configs/constants';
import { Outlet } from 'react-router-dom';

//! UTILS
import { getToken } from 'utils/auth';

//! COMPONENT
import LoadingMain from 'components/LoadingToRedirects/LoadingMain';

function Admin_Private_Router({ element: Element, ...rest }) {
  // Take token
  const token = getToken(CONSTANTS.AUTH_TOKEN);
  return <>{token ? <Outlet /> : <LoadingMain data={false} />}</>;
}

export default Admin_Private_Router;
