//! LIBRARY
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! SHARE
import CONSTANTS from '../../configs/constants';
import { getToken } from '../../utils/auth';

//! REDUX THUNK
import { Profile_Admin_Initial } from 'redux/managers/authentication_slice/auth_thunk';

const AuthCMS = () => {
  // Take profile account store
  const { admin_auth } = useSelector((state) => ({
    ...state.admin_user,
  }));
  // InitialState Action
  const dispatch = useDispatch();

  // Get Token localStore
  const token_localStorage = getToken(CONSTANTS.AUTH_TOKEN);

  useEffect(() => {
    if (token_localStorage) {
      dispatch(Profile_Admin_Initial());
    }
  }, [admin_auth]);

  return {};
};
export default AuthCMS;
