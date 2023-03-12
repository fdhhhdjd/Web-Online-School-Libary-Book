import Layout from 'components/Layout';
import ChangePassword from 'pages/Auth/ChangePassword';
import AllBook from 'pages/Book/AllBooks';
import DetailBook from 'pages/Book/DetailBook';
import Home from 'pages/Home';
import BookBorrowInfo from 'pages/UserProfile/BookBorrowInfo';
import UserProfile from 'pages/UserProfile/ProfileLayout';
import UserInfo from 'pages/UserProfile/UserInfo';

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
    path: '/book',
    main: (
      <>
        <Layout content={<AllBook />} />
      </>
    ),
  },
  {
    path: '/detail-book/:id',
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
    path: '/user/profile',
    main: (
      <>
        <Layout content={<UserProfile content={<UserInfo />} />} />
      </>
    ),
  },
  {
    path: '/book/borrow',
    main: (
      <>
        <Layout content={<UserProfile content={<BookBorrowInfo />} />} />
      </>
    ),
  },
];
export default RouteDataMain;
