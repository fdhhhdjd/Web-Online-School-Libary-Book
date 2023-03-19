//!LIBRARY
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouterNprogress = () => {
  const location = useLocation();

  useEffect(() => {
    const unlisten = () => {
      NProgress.start();
    };

    return unlisten;
  }, [location]);

  useEffect(() => {
    NProgress.done();
  });

  return null;
};

export default RouterNprogress;
