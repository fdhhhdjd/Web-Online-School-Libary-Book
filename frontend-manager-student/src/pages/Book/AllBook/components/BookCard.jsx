//! LIBRARy
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Get_All_Favorite_Initial } from 'redux/student/favorite_slice/favorite_thunk';

//! SHARE
import HELPERS from 'utils/helper';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  // data
  const [flagFavorite, setFlagFavorite] = useState(null);

  const handleAddFavorite = (book_id) => {
    HELPERS.handleFavoriteBook(book_id, dispatch)
      .then(() => {
        setFlagFavorite(true);
      })
      .then(() => {
        dispatch(Get_All_Favorite_Initial());
      });
  };

  const handleRemoveFavorite = (favorite_book_id) => {
    HELPERS.handleDeleteFavoriteBook(favorite_book_id, dispatch).then(() => {
      setFlagFavorite(false);
    });
  };

  useEffect(() => {
    setFlagFavorite(book.isFavorite);
  }, [book]);

  return (
    <div className="book__list__item">
      <div className="book__list__item__name">
        <Link to={`/book/${book.book_id}`}>{book.name}</Link>
      </div>
      <Row>
        <Col sm={1}>
          <div className="book__list__item__img">
            <img src={book?.image_uri} alt="" />
          </div>
        </Col>
        <Col sm={11}>
          <div className="book__data">
            <div className="book__data__author">
              Tác giả: <Link to="/author">{book?.name_author}</Link>
            </div>
            {/* <div className="book__data__publisher">
              Nhà xuất bản: <Link to="/publisher">Gia Bảo</Link>
            </div> */}
            <div className="book__data__album">
              Ngành: <Link to="/album">{book?.industry_code_name}</Link>
            </div>
            <div className="book__data__id">
              Mã sách: <Link to="/album">{book.book_id}</Link>
            </div>
            <div className="book__data__category">
              <span>
                Thể loại: <Link to="/category">Trinh thám</Link>
              </span>

              {flagFavorite ? (
                <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveFavorite(book.favorite_book_id)}>
                  <i className="bx bxs-heart" style={{ color: '#ec1d25 ' }}></i>
                </span>
              ) : (
                <span style={{ cursor: 'pointer' }} onClick={() => handleAddFavorite(book.book_id)}>
                  <i className="bx bx-heart" style={{ color: '#ec1d25 ' }}></i>
                </span>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookCard;
