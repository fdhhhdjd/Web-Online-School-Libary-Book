//! LIBRARY
import { createContext, useContext, useEffect } from 'react';

//! SHARE
import CONSTANTS from 'configs/constants';
import { getToken } from 'utils/auth';

//! CONTEXT CHILD
import { useDispatch } from 'react-redux';
import HELPERS from 'utils/helper';
import AuthStudent from './auth_student/auth_student';

//! REDUX THUNK CALL API
import { Renew_Token_Student_Initial } from 'redux/student/authentication_slice/auth_thunk';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/03/2023
 * @descriptionKey Setting Context
 */

//! Create Context
export const store_library_school_contextUser = createContext();

//! Give Store Context
export const useContextStudent = () => useContext(store_library_school_contextUser);

export const DataProviderStudent = ({ children }) => {
  //InitialState action
  const dispatch = useDispatch();

  // Get Token localStore
  const token_access_localStorage = getToken(CONSTANTS.AUTH_TOKEN);

  useEffect(() => {
    // Check Token LocalStorage
    if (token_access_localStorage) {
      // Return true or false
      const decodedToken = HELPERS.isTokenExpired(token_access_localStorage);

      // Function new token
      const newToken = () => {
        //Token expired
        if (decodedToken === CONSTANTS.DELETED_DISABLE) {
          // Token expired, try to renew it
          dispatch(Renew_Token_Student_Initial());
        }
        // Schedule next token renewal
        setTimeout(() => {
          //Start
          newToken();
        }, CONSTANTS._4_MINUTES);
      };

      //Start
      newToken();
    }
  }, [token_access_localStorage, dispatch]);

  //! Data
  const data = {
    profile_student_context: AuthStudent(),
  };

  //! Name conText
  store_library_school_contextUser.displayName = 'Library School';

  //! Use Context Global
  return <store_library_school_contextUser.Provider value={data}>{children}</store_library_school_contextUser.Provider>;
};
