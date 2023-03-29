const API_ADMIN = {
  //! auth api
  LOGIN_ADMIN_CMS: '/manager/v1/admin/login',
  RENEW_TOKEN_CMS: '/manager/v1/admin/renew-token',

  //! book api
  GET_ALL_BOOK_CMS: '/manager/v1/admin/private/book/all',
  GET_DETAIL_BOOK_CMS: '/manager/v1/admin/private/book/detail',
  CREATE_BOOK_CMS: '/manager/v1/admin/private/book/create',
  DELETE_BOOK_CMS: '/manager/v1/admin/private/book/delete',

  //! author api
  GET_ALL_AUTHOR_CMS: '/manager/v1/admin/private/author/all',
  GET_DETAIL_AUTHOR_CMS: '/manager/v1/admin/private/author/detail',
  CREATE_AUTHOR_CMS: '/manager/v1/admin/private/author/create',
  EDIT_AUTHOR_CMS: '/manager/v1/admin/private/author/update',
  DELETE_AUTHOR_CMS: '/manager/v1/admin/private/author/delete',

  //! student api
  GET_ALL_ACCOUNT_CMS: '/manager/v1/admin/private/student/all',
  GET_DETAIL_ACCOUNT_CMS: '/manager/v1/admin/private/student/detail',
  CREATE_ACCOUNT_CMS: '/manager/v1/admin/private/student/create',
  DELETE_ACCOUNT_CMS: '/manager/v1/admin/private/student/delete',
};
export default API_ADMIN;
