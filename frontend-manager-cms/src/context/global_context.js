//! LIBRARY
import { createContext, useContext } from 'react';

//! SHARE

//! CONTEXT CHILD
// import AuthStudent from './auth_cms/auth_cms';

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
