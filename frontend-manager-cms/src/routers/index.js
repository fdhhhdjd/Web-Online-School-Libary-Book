//! COMPONENTS
import Sidebar from 'components/Sidebar';

//! PAGES
import AddUser from 'pages/Account/AddUser';
import AllUser from 'pages/Account/AllUser';
import EditUser from 'pages/Account/EditUser';
import AddAuthor from 'pages/Author/AddAuthor';
import AllAuthor from 'pages/Author/AllAuthor';
import EditAuthor from 'pages/Author/EditAuthor';
import AddBook from 'pages/Book/AddBook';
import Book from 'pages/Book/AllBook';
import EditBook from 'pages/Book/EditBook';
import Login from '../pages/Auth/Login';

//! PRIVATE ROUTES
import ViewBook from 'pages/Book/ViewBook';
import AllBorrowBook from 'pages/BorrowBook/AllBorrowBook';
import EditBorrow from 'pages/BorrowBook/EditBorrow';
import AdminPrivateRouter from 'private/Admin_Private_Router';
import AdminPrivateRouterlogin from 'private/Admin_Private_Router_login';
import ViewAuthor from 'pages/Author/ViewAuthor';
import ViewUser from 'pages/Account/ViewUser';
import ViewBorrowBook from 'pages/BorrowBook/ViewBorrowBook';

const RouteDataMain = [
  {
    path: '/',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar />
      </>
    ),
  },
  {
    path: '/book/all',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Danh sách tài liệu" content={<Book />} />
      </>
    ),
  },
  {
    path: '/book/edit/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Chỉnh sửa sách" content={<EditBook />} />
      </>
    ),
  },
  {
    path: '/book/view/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin sách" content={<ViewBook />} />
      </>
    ),
  },
  {
    path: '/book/add',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thêm sách" content={<AddBook />} />
      </>
    ),
  },
  {
    path: '/borrow/all',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Danh sách sách mượn" content={<AllBorrowBook />} />
      </>
    ),
  },
  {
    path: '/borrow/edit/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Cập nhật sách mượn" content={<EditBorrow />} />
      </>
    ),
  },
  {
    path: '/borrow/view/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin sách mượn" content={<ViewBorrowBook />} />
      </>
    ),
  },
  {
    path: '/user/all',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Danh sách tài khoản người dùng" content={<AllUser />} />
      </>
    ),
  },
  {
    path: '/user/edit/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Chỉnh sửa tài khoản người dùng" content={<EditUser />} />
      </>
    ),
  },
  {
    path: '/user/view/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin tài khoản người dùng" content={<ViewUser />} />
      </>
    ),
  },
  {
    path: '/user/add',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thêm tài khoản" content={<AddUser />} />
      </>
    ),
  },
  {
    path: '/author/all',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Danh sách tác giả" content={<AllAuthor />} />
      </>
    ),
  },
  {
    path: '/author/edit/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<EditAuthor />} />
      </>
    ),
  },
  {
    path: '/author/view/:id',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<ViewAuthor />} />
      </>
    ),
  },
  {
    path: '/author/add',
    private: <AdminPrivateRouterlogin />,
    main: (
      <>
        <Sidebar title="Thông tin tác giả" content={<AddAuthor />} />
      </>
    ),
  },
  {
    path: '/login',
    private: <AdminPrivateRouter />,
    main: (
      <>
        <Login />
      </>
    ),
  },
];
export default RouteDataMain;
