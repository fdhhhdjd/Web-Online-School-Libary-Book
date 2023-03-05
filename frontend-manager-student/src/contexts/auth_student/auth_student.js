//! LIBRARY
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//! SHARE
import HELPERS from 'utils/helper';
import CONSTANTS from '../../configs/constants';
import { getToken } from '../../utils/auth';

//! REDUX THUNK
import { Profile_Student_Initial } from '../../redux/student/authentication_slice/auth_thunk';

const AuthStudent = () => {
  // InitialState Action
  const dispatch = useDispatch();

  // Get Token localStore
  const token_localStorage = getToken(CONSTANTS.AUTH_TOKEN);

  //Check Token
  const decodedToken = HELPERS.isTokenExpired(token_localStorage);

  useEffect(() => {
    if (token_localStorage && decodedToken) {
      dispatch(Profile_Student_Initial(token_localStorage));
    }
  }, []);

  return {};
};
export default AuthStudent;