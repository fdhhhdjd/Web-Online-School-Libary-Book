import Layout from 'components/Layout';
import Book from 'pages/Customer/Book';
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
        <Layout content={<Book />} />
      </>
    ),
  },
  // {
  //   path: '/detail',
  //   main: (
  //     <>
  //       <Layout content={<DetailBook />} />
  //     </>
  //   ),
  // },
];
export default RouteDataMain;
