/* eslint-disable prettier/prettier */
//! LIBRARY
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! COMPONENT
import Filter from 'components/Filter';
import Section, { SectionBody } from 'components/Section';
import { useDispatch } from 'react-redux';
import HELPERS from 'utils/helper';
import AllBookSkeleton from './AllBookSkeleton';

const TabAllBooks = ({ bookList, currentPage, totalBook, executeTime, loading }) => {
  const dispatch = useDispatch();

  const handleFavorite = (book_id) => {
    HELPERS.handleFavoriteBook(book_id, dispatch);
  }

  return (
    <Section>
      <SectionBody>
        <Row>
          <Col sm={3}>
            <Filter />
          </Col>
          <Col sm={9}>
            <div className="book__container main">
              <div className="book__container__header">
                <div className="header__data">
                  Trang {currentPage} trong {totalBook} kết quả ({executeTime} giây)
                </div>
                <div className="header__sort">
                  <span>Sắp xếp theo</span>
                  <select name="selectedFruit">
                    <option value="all">Tất cả</option>
                    <option value="time_inc">Thời gian tăng dần &uarr;</option>
                    <option value="time_dec">Thời gian giảm dần &darr;</option>
                  </select>
                </div>
              </div>

              <div className="book__list">
                {!loading
                  ? bookList?.map((book, idx) => (
                    <div className="book__list__item" key={idx}>
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
                              Tác giả: <Link to="/author">Gia Bảo</Link>
                            </div>
                            <div className="book__data__publisher">
                              Nhà xuất bản: <Link to="/publisher">Gia Bảo</Link>
                            </div>
                            <div className="book__data__album">
                              Bộ sưu tập: <Link to="/album">Gia Bảo</Link>
                            </div>
                            <div className="book__data__id">
                              Mã sách: <Link to="/album">{book.book_id}</Link>
                            </div>
                            <div className="book__data__category">
                              <span>
                                Thể loại: <Link to="/category">Trinh thám</Link>
                              </span>

                              <span style={{ cursor: "pointer" }} onClick={() => handleFavorite(book.book_id)}>
                                <i className="bx bxs-heart" style={{ color: '#ec1d25 ' }}></i>
                                <span style={{ fontWeight: 'normal' }}>Lưu vào danh sách yêu thích</span>
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
                  : <AllBookSkeleton amount={4} />}
              </div>
            </div>
          </Col>
        </Row>
      </SectionBody>
    </Section>
  );
};

export default TabAllBooks;
