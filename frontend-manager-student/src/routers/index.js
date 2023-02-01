import Layout from 'components/Layout/Layout';
import CategoryPage from 'pages/Customer/CategoryPage';
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
  {
    path: '/category',
    main: (
      <>
        <Layout content={<CategoryPage />} />
      </>
    ),
  },
];
export default RouteDataMain;
