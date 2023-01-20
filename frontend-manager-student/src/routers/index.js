import Layout from 'components/Layout/Layout';
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
];
export default RouteDataMain;
