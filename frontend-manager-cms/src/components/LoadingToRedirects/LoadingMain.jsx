import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NOTIFICATION from 'utils/notification';

const LoadingMain = ({ data }) => {
  console.log(data, data);
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      // Check If Already login
      const interval = setInterval(() => {
        setCount((currentCount) => --currentCount);
      }, 1000);
      count === 0 && navigate('/', { replace: true, state: { from: location } });
      count === 0 && NOTIFICATION.notifyError('Please Logout😵');
      return () => clearInterval(interval);
    } else {
      // Check if not login
      const interval = setInterval(() => {
        setCount((currentCount) => --currentCount);
      }, 1000);
      count === 0 && navigate('/login', { replace: true, state: { from: location } });
      count === 0 && NOTIFICATION.notifyError('Please Login  when you to the WebSite 😵');
      return () => clearInterval(interval);
    }
  }, [count]);
  return (
    <React.Fragment>
      <div className=" loader-container">
        <h1>Loading.....</h1>
      </div>
    </React.Fragment>
  );
};

export default LoadingMain;
