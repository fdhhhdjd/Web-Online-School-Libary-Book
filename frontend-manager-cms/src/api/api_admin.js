const API_ADMIN = {
  //! auth api
  LOGIN_ADMIN_CMS: '/manager/v1/admin/login',
  RENEW_TOKEN_CMS: '/manager/v1/admin/renew-token',
  GET_PROFILE_CMS: '/manager/v1/admin/private/profile',

  //! book api
  GET_ALL_BOOK_CMS: '/manager/v1/admin/private/book/all',
  GET_DETAIL_BOOK_CMS: '/manager/v1/admin/private/book/detail',
  CREATE_BOOK_CMS: '/manager/v1/admin/private/book/create',
  EDIT_BOOK_CMS: '/manager/v1/admin/private/book/update',
  DELETE_BOOK_CMS: '/manager/v1/admin/private/book/delete',

  //! borrow  book api
  GET_ALL_BORROW_CMS: '/manager/v1/admin/private/borrow_book/all',
  GET_DETAIL_BORROW_CMS: '/manager/v1/admin/private/borrow_book/detail',
  // CREATE_BORROW_CMS: '/manager/v1/admin/private/book/create',
  // DELETE_BORROW_CMS: '/manager/v1/admin/private/book/delete',
  EDIT_BORROW_CMS: '/manager/v1/admin/private/borrow_book/update',

  //! author api
  GET_ALL_AUTHOR_CMS: '/manager/v1/admin/private/author/all',
  GET_DETAIL_AUTHOR_CMS: '/manager/v1/admin/private/author/detail',
  CREATE_AUTHOR_CMS: '/manager/v1/admin/private/author/create',
  EDIT_AUTHOR_CMS: '/manager/v1/admin/private/author/update',
  DELETE_AUTHOR_CMS: '/manager/v1/admin/private/author/delete',

  //! category api
  GET_ALL_CATEGORY_CMS: '/manager/v1/admin/private/categories/all',
  GET_DETAIL_CATEGORY_CMS: '/manager/v1/admin/private/categories/detail',
  CREATE_CATEGORY_CMS: '/manager/v1/admin/private/categories/create',
  EDIT_CATEGORY_CMS: '/manager/v1/admin/private/categories/update',
  DELETE_CATEGORY_CMS: '/manager/v1/admin/private/categories/delete',
  GET_ALL_BOOK_CATEGORY_CMS: '/manager/v1/admin/private/book-categories/all',

  //! major api
  GET_ALL_MAJOR_CMS: '/manager/v1/admin/private/industry-code/all',
  GET_DETAIL_MAJOR_CMS: '/manager/v1/admin/private/industry-code/detail',
  CREATE_MAJOR_CMS: '/manager/v1/admin/private/industry-code/create',
  EDIT_MAJOR_CMS: '/manager/v1/admin/private/industry-code/update',
  DELETE_MAJOR_CMS: '/manager/v1/admin/private/industry-code/delete',

  //! student api
  GET_ALL_ACCOUNT_CMS: '/manager/v1/admin/private/student/all',
  GET_DETAIL_ACCOUNT_CMS: '/manager/v1/admin/private/student/detail',
  EDIT_ACCOUNT_CMS: '/manager/v1/admin/private/student/update',
  CREATE_ACCOUNT_CMS: '/manager/v1/admin/private/student/create',
  CREATE_ACCOUNT_EXCEL: '/manager/v1/admin/private/add/student',
  DELETE_ACCOUNT_CMS: '/manager/v1/admin/private/student/delete',
};
export default API_ADMIN;
