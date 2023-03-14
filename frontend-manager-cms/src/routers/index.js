import Sidebar from 'components/Sidebar';
import AddUser from 'pages/Account/AddUser';
import AllUser from 'pages/Account/AllUser';
import AddAuthor from 'pages/Author/AddAuthor';
import AllAuthor from 'pages/Author/AllAuthor';
import EditAuthor from 'pages/Author/EditAuthor';
import AddBook from 'pages/Book/AddBook';
import Book from 'pages/Book/AllBook';
import EditBook from 'pages/Book/EditBook';
import Login from '../pages/Auth/Login';

const RouteDataMain = [
  {
    path: '/',
    main: (
      <>
        <Sidebar />
      </>
    ),
  },
  {
    path: '/book/all',
    main: (
      <>
        <Sidebar title="Danh sách tài liệu" content={<Book />} />
      </>
    ),
  },
  {
    path: '/book/:id',
    main: (
      <>
        <Sidebar title="Thông tin sách" content={<EditBook />} />
      </>
    ),
  },
  {
    path: '/book/add',
    main: (
      <>
        <Sidebar title="Thêm sách" content={<AddBook />} />
      </>
    ),
  },
  {
    path: '/user/all',
    main: (
      <>
        <Sidebar title="Danh sách tài khoản người dùng" content={<AllUser />} />
      </>
    ),
  },
  {
    path: '/user/add',
    main: (
      <>
        <Sidebar title="Thêm tài khoản" content={<AddUser />} />
      </>
    ),
  },
  {
    path: '/author/all',
    main: (
      <>
        <Sidebar title="Danh sách tác giả" content={<AllAuthor />} />
      </>
    ),
  },
  {
    path: '/author/:id',
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<EditAuthor />} />
      </>
    ),
  },
  {
    path: '/author/add',
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<AddAuthor />} />
      </>
    ),
  },
  {
    path: '/login',
    main: (
      <>
        <Login />
      </>
    ),
  },
];
export default RouteDataMain;
