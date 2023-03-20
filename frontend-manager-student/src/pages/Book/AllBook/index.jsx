//! LIBRARY
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENT
import TabAllBooks from './components/TabAllBooks';
import Helmet from 'components/Helmet';

//! REDUX THUNK
import { Get_All_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';

const AllBook = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);

  useEffect(() => {
    dispatch(Get_All_Book_Student_Initial());
  }, [dispatch]);

  useEffect(() => {
    console.log(bookList);
  }, [bookList]);

  return <Helmet title="Tài liệu">{bookList && <TabAllBooks bookList={bookList} />}</Helmet>;
};

export default AllBook;
