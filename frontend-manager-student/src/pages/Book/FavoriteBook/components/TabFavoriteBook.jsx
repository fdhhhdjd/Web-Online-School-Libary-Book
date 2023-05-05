//! LIBRARY
import Helmet from 'components/Helmet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENT
import Section, { SectionTitle } from 'components/Section';
import FavoriteCard from './FavoriteCard';

//! REDUX THUNK
import { Get_All_Favorite_Initial } from 'redux/student/favorite_slice/favorite_thunk';
import { useState } from 'react';

const TabFavoriteBook = () => {
  const dispatch = useDispatch();

  // data
  const bookList = useSelector((state) => state.favorite.favorite_list?.element?.result);
  const [allBook, setAllBook] = useState(null);

  useEffect(() => {
    dispatch(Get_All_Favorite_Initial());
  }, [dispatch]);

  useEffect(() => {
    setAllBook(bookList);
  }, [bookList]);

  return (
    <Helmet title="Danh sách yêu thích">
      <div className="book__list book__favorite main">
        <Section>
          <SectionTitle>Danh sách yêu thích</SectionTitle>
          {allBook && allBook?.map((book, idx) => <FavoriteCard book={book} key={idx} />)}
        </Section>
      </div>
    </Helmet>
  );
};

export default TabFavoriteBook;
