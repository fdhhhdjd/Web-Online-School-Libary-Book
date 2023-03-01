import Layout from 'components/Layout';
import AllBook from 'pages/Customer/Book/AllBooks';
import DetailBook from 'pages/Customer/Book/DetailBook';
import Home from 'pages/Customer/Home';

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
];
export default RouteDataMain;
