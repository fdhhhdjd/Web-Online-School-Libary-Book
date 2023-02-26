import Layout from 'components/Layout';
import Home from 'pages/Customer/Home';

const RouteDataMain = [
  {
    path: '',
    main: (
      <>
        <Layout content={<Home />} />
      </>
    ),
  },
  // {
  //   path: '/category',
  //   main: (
  //     <>
  //       <Layout content={<CategoryPage />} />
  //     </>
  //   ),
  // },
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
