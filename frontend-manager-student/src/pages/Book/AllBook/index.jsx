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
import { Get_All_Category_Initial } from 'redux/student/category_slice/category_thunk';
import { Get_All_Favorite_Initial } from 'redux/student/favorite_slice/favorite_thunk';
import { Get_All_Major_Initial } from 'redux/student/major_slice/major_thunk';
import { useParams } from 'react-router-dom';

const AllBook = ({ textFilter, filter }) => {
  // router
  const { id } = useParams();
  // pagination state
  const start = useRef(0);
  const end = useRef(0);
  const totalPage = useRef(0);
  const bookPerPage = 5;
  const currentPage = useRef(1);

  // redux
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);
  const categoryList = useSelector((state) => state.category.all_categories?.element?.result);
  const majorList = useSelector((state) => state.major.all_major?.element?.result);
  const favList = useSelector((state) => state.favorite.favorite_list?.element?.result);

  const { profile_student } = useSelector((state) => ({
    ...state.auth_student,
  }));
  // const loading = useSelector((state) => state.book.loading);

  // state
  const [bookRender, setBookRender] = useState(null);
  const [allBooks, setAllBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e, p) => {
    start.current = performance.now();
    window.scrollTo(0, 0);
    currentPage.current = p;
    setBookRender([...bookList].splice(bookPerPage * (currentPage.current - 1), bookPerPage));
  };

  useEffect(() => {
    start.current = performance.now();

    if (profile_student) {
      if (bookList) {
        if (favList) {
          setAllBooks(HELPERS.mergeFavoriteBook(bookList, favList));
        } else {
          dispatch(Get_All_Favorite_Initial()).then((result) => {
            setAllBooks(HELPERS.mergeFavoriteBook(bookList, result?.payload?.element?.result));
          });
        }
      } else {
        Promise.all([
          dispatch(Get_All_Book_Student_Initial()),
          dispatch(Get_All_Category_Initial()),
          dispatch(Get_All_Major_Initial()),
          dispatch(Get_All_Favorite_Initial()),
        ]).then((result) => {
          setAllBooks(
            HELPERS.mergeFavoriteBook(result[0]?.payload?.element?.result, result[2]?.payload?.element?.result),
          );
        });
      }
    } else {
      if (!bookList) {
        Promise.all([
          dispatch(Get_All_Book_Student_Initial()),
          dispatch(Get_All_Category_Initial()),
          dispatch(Get_All_Major_Initial()),
        ]).then((result) => {
          setAllBooks(result[0]?.payload?.element?.result);
        });
      } else {
        setAllBooks(bookList);
      }
    }

    switch (filter) {
      case 'field':
        if (allBooks) {
          setAllBooks(HELPERS.filterBookByMajor(id, bookList));
        }

        break;

      default:
    }
  }, [profile_student, favList, id]);

  useEffect(() => {
    if (allBooks) {
      setLoading(false);
      setBookRender([...allBooks].splice(bookPerPage * (currentPage.current - 1), bookPerPage));
    }

    return () => {
      setLoading(true);
    };
  }, [bookList, bookPerPage, allBooks]);

  return (
    <Helmet title="Tài liệu">
      <>
        {(end.current = performance.now())}
        <TabAllBooks
          textFilter={textFilter}
          category={categoryList}
          major={majorList}
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
