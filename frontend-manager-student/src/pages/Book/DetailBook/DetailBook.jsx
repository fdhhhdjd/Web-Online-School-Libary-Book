//! COMPONENT
import Helmet from 'components/Helmet';
import TabDetailBook from './components/TabDetailBook';

//! LIBRARY
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//! REDUX THUNK
import { Get_Detail_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';

const DetailBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);

  useEffect(() => {
    dispatch(Get_Detail_Book_Student_Initial({ id }));
  }, [dispatch, id]);

  return (
    <Helmet title="Harry Porter">
      <TabDetailBook detailBook={detailBook} />
    </Helmet>
  );
};

export default DetailBook;
