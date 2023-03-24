import Sidebar from 'components/Sidebar';
import AddUser from 'pages/Account/AddUser';
import AllUser from 'pages/Account/AllUser';
import AddAuthor from 'pages/Author/AddAuthor';
import AllAuthor from 'pages/Author/AllAuthor';
import EditAuthor from 'pages/Author/EditAuthor';
import AddBook from 'pages/Book/AddBook';
import Book from 'pages/Book/AllBook';
import EditBook from 'pages/Book/EditBook';
import Admin_Private_Router from 'private/Admin_Private_Router';
import Admin_Private_Router_login from 'private/Admin_Private_Router_login';
import Login from '../pages/Auth/Login';

const RouteDataMain = [
  {
    path: '/',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar />
      </>
    ),
  },
  {
    path: '/book/all',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Danh sách tài liệu" content={<Book />} />
      </>
    ),
  },
  {
    path: '/book/:id',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Thông tin sách" content={<EditBook />} />
      </>
    ),
  },
  {
    path: '/book/add',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Thêm sách" content={<AddBook />} />
      </>
    ),
  },
  {
    path: '/user/all',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Danh sách tài khoản người dùng" content={<AllUser />} />
      </>
    ),
  },
  {
    path: '/user/add',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Thêm tài khoản" content={<AddUser />} />
      </>
    ),
  },
  {
    path: '/author/all',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Danh sách tác giả" content={<AllAuthor />} />
      </>
    ),
  },
  {
    path: '/author/:id',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<EditAuthor />} />
      </>
    ),
  },
  {
    path: '/author/add',
    private: <Admin_Private_Router_login />,
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<AddAuthor />} />
      </>
    ),
  },
  {
    path: '/login',
    private: <Admin_Private_Router />,
    main: (
      <>
        <Login />
      </>
    ),
  },
];
export default RouteDataMain;
