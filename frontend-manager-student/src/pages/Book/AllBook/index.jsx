//! LIBRARY
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';

//! COMPONENT
import TabAllBooks from './components/TabAllBooks';
import Helmet from 'components/Helmet';

//! REDUX THUNK
import { Get_All_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';
import HELPERS from 'utils/helper';

const AllBook = () => {
  // pagination state
  const start = useRef(0);
  const end = useRef(0);
  const totalPage = useRef(0);
  const bookPerPage = 5;
  const currentPage = useRef(1);

  // redux
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);
  const [bookRender, setBookRender] = useState(null);
  const loading = useSelector((state) => state.book.loading);

  const handleChange = (e, p) => {
    start.current = performance.now();
    window.scrollTo(0, 0);
    currentPage.current = p;
    setBookRender([...bookList].splice(bookPerPage * (currentPage.current - 1), bookPerPage));
  };

  useEffect(() => {
    start.current = performance.now();
    dispatch(Get_All_Book_Student_Initial());
  }, [dispatch]);

  useEffect(() => {
    if (bookList) {
      setBookRender([...bookList].splice(bookPerPage * (currentPage.current - 1), bookPerPage));
    }
  }, [bookList, bookPerPage]);

  return (
    <Helmet title="Tài liệu">
      <>
        {(end.current = performance.now())}
        <TabAllBooks
          totalBook={bookList?.length}
          executeTime={HELPERS.getExecuteTimeSecond(start.current, end.current)}
          bookList={bookRender}
          currentPage={currentPage.current}
          loading={loading}
        />
        {(totalPage.current = Math.ceil(bookList?.length / bookPerPage))}
        {bookList && (
          <Pagination
            count={totalPage.current}
            color="primary"
            className="all-book__pagination"
            size="large"
            onChange={handleChange}
          ></Pagination>
        )}
      </>
    </Helmet>
  );
};

export default AllBook;
