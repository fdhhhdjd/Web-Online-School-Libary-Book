//! LIBRARY
import { createContext, useContext, useState } from 'react';

//! CONTEXT CHILD
import AuthStudent from './auth_student/auth_student';

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
  // state
  const [showLogin, setShowLogin] = useState(false);
  const [showCommentReply, setShowCommentReply] = useState(false);

  //! Data
  const data = {
    profile_student_context: AuthStudent(),
    login: [showLogin, setShowLogin],
    commentReply: [showCommentReply, setShowCommentReply],
  };

  //! Name conText
  store_library_school_contextUser.displayName = 'Library School';

  //! Use Context Global
  return <store_library_school_contextUser.Provider value={data}>{children}</store_library_school_contextUser.Provider>;
};
