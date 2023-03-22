//! LIBRARY
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! SHARE
import CONSTANTS from '../../configs/constants';
import { getToken } from '../../utils/auth';

//! REDUX THUNK
import { Profile_Student_Initial } from '../../redux/student/authentication_slice/auth_thunk';

const AuthStudent = () => {
  // Take profile account store
  const { token_student } = useSelector((state) => ({
    ...state.auth_student,
  }));
  // InitialState Action
  const dispatch = useDispatch();

  // Get Token localStore
  const token_localStorage = getToken(CONSTANTS.AUTH_TOKEN);

  useEffect(() => {
    if (token_localStorage) {
      dispatch(Profile_Student_Initial());
    }
  }, [token_student]);

  return {};
};
export default AuthStudent;
