//! LIBRARY
import { useNavigate } from 'react-router-dom';

const Navigate = () => {
  //Create navigate
  const navigate = useNavigate();

  // Handle change page
  const navigateChangePage = (link) => {
    navigate(link);
  };

  return { navigateChangePage };
};

export default Navigate;
