import Layout from 'components/Layout';
import ChangePassword from 'pages/Auth/ChangePassword';
import AllBook from 'pages/Book/AllBooks';
import DetailBook from 'pages/Book/DetailBook';
import Home from 'pages/Home';
import UserProfile from 'pages/UserProfile';

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
    path: '/detail-book',
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
        <Layout content={<UserProfile />} />
      </>
    ),
  },
];
export default RouteDataMain;
