//! LIBRARY
import { createContext, useContext, useEffect } from 'react';

//! SHARE
import CONSTANTS from 'configs/constants';
import { getToken } from 'utils/auth';

//! CONTEXT CHILD
import { useDispatch } from 'react-redux';
import HELPERS from 'utils/helper';
// import AuthStudent from './auth_cms/auth_cms';

//! REDUX THUNK CALL API
import { Renew_Token_Cms_Initial } from 'redux/managers/authentication_slice/auth_thunk';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/03/2023
 * @descriptionKey Setting Context
 */

//! Create Context
export const store_library_school_contextUser = createContext();

//! Give Store Context
export const useContextStudent = () => useContext(store_library_school_contextUser);

export const DataProviderCMS = ({ children }) => {
  //! Data
  // const data = {
  //   profile_student_context: AuthStudent(),
  // };

  //! Name conText
  store_library_school_contextUser.displayName = 'Library School';

  //! Use Context Global
  return <store_library_school_contextUser.Provider>{children}</store_library_school_contextUser.Provider>;
};
