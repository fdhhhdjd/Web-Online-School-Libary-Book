import Sidebar from 'components/Sidebar';
import AllUser from 'pages/Account/AllUser';
import Book from 'pages/Book/AllBook';

const RouteDataMain = [
  {
    path: '/',
    main: (
      <>
        <Sidebar />
      </>
    ),
  },
  {
    path: '/all-book',
    main: (
      <>
        <Sidebar content={<Book />} />
      </>
    ),
  },
  {
    path: '/all-user',
    main: (
      <>
        <Sidebar content={<AllUser />} />
      </>
    ),
  },
];
export default RouteDataMain;
