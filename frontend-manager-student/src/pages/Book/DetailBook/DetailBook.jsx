//! COMPONENT
import Helmet from 'components/Helmet';
import TabDetailBook from './components/TabDetailBook';

//! LIBRARY
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//! REDUX THUNK
import { reset_detail_book } from 'redux/student/book_slice/book_slice';
import { Get_Detail_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';
import { useState } from 'react';

const DetailBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);

  const [detail, setDetail] = useState();

  const loading = useSelector((state) => state.book.loading);

  useEffect(() => {
    dispatch(Get_Detail_Book_Student_Initial({ id }));

    return () => {
      dispatch(reset_detail_book());
    };
  }, []);

  useEffect(() => {
    setDetail(detailBook);
  }, [detailBook]);

  return (
    <Helmet title="Harry Porter">
      <TabDetailBook detailBook={detail} loading={loading} />
    </Helmet>
  );
};

export default DetailBook;
