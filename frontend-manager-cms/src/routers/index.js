import Sidebar from 'components/Sidebar';
import AllUser from 'pages/Account/AllUser';
import AllAuthor from 'pages/Author/AllAuthor';
import EditAuthor from 'pages/Author/EditAuthor';
import Book from 'pages/Book/AllBook';
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
    path: '/user/all',
    main: (
      <>
        <Sidebar title="Danh sách tài khoản người dùng" content={<AllUser />} />
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
    path: '/login',
    main: (
      <>
        <Login />
      </>
    ),
  },
];
export default RouteDataMain;
