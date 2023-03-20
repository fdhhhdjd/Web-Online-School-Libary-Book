//! PAGES
import ChangePassword from 'pages/Auth/ChangePassword';
import ResetPassword from 'pages/Auth/ResetPassword';
import AllBook from 'pages/Book/AllBook';
import DetailBook from 'pages/Book/DetailBook/DetailBook';
import Home from 'pages/Home';
import BookBorrowInfo from 'pages/UserProfile/components/BookBorrowInfo';
import UserProfile from 'pages/UserProfile';
import UserInfo from 'pages/UserProfile/components/UserInfo';

//! COMPONENT
import Layout from 'components/Layout';

const RouteDataMain = [
  {
    path: '/',
    main: (
      <>
        <Layout content={<Home />} />
      </>
    ),
  },
  {
    path: '/book/all',
    main: (
      <>
        <Layout content={<AllBook />} />
      </>
    ),
  },
  {
    path: '/book/:id',
    main: (
      <>
        <Layout content={<DetailBook />} />
      </>
    ),
  },
  {
    path: '/user/changePassword',
    main: (
      <>
        <Layout content={<ChangePassword />} />
      </>
    ),
  },
  {
    path: '/password/reset/:id',
    main: (
      <>
        <Layout content={<ResetPassword />} />
      </>
    ),
  },
  {
    path: '/user/profile',
    main: (
      <>
        <Layout content={<UserProfile content={<UserInfo />} />} />
      </>
    ),
  },
  {
    path: '/user/borrow',
    main: (
      <>
        <Layout content={<UserProfile content={<BookBorrowInfo />} />} />
      </>
    ),
  },
];
export default RouteDataMain;
