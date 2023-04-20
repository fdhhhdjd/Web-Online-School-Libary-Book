//! PAGES
import ChangePassword from 'pages/Auth/ChangePassword';
import ResetPassword from 'pages/Auth/ResetPassword';
import AllBook from 'pages/Book/AllBook';
import DetailBook from 'pages/Book/DetailBook/DetailBook';
import Home from 'pages/Home';
import BookBorrowInfo from 'pages/UserProfile/components/BookBorrowInfo';
import UserProfile from 'pages/UserProfile';
import UserInfo from 'pages/UserProfile/components/UserInfo';

//! LINK ROUTER
import LINK_ROUTER from '../configs/link_router';

//! COMPONENT
import Layout from 'components/Layout';
import TabFavoriteBook from 'pages/Book/FavoriteBook/components/TabFavoriteBook';

const RouteDataMain = [
  {
    path: LINK_ROUTER.LINK._HOME,
    main: (
      <>
        <Layout content={<Home />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._BOOK_ALL,
    main: (
      <>
        <Layout content={<AllBook />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._BOOK_DETAIL,
    main: (
      <>
        <Layout content={<DetailBook />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._FAVORITE_BOOK,
    main: (
      <>
        <Layout content={<TabFavoriteBook />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._CHANGE_PASSWORD,
    main: (
      <>
        <Layout content={<ChangePassword />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._RESET_PASSWORD,
    main: (
      <>
        <Layout content={<ResetPassword />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._PROFILE,
    main: (
      <>
        <Layout content={<UserProfile content={<UserInfo />} />} />
      </>
    ),
  },
  {
    path: LINK_ROUTER.LINK._BORROW_BOOK,
    main: (
      <>
        <Layout content={<UserProfile content={<BookBorrowInfo />} />} />
      </>
    ),
  },
];
export default RouteDataMain;
