import Filter from 'components/Filter';
import Helmet from 'components/Helmet';
import Section, { SectionBody } from 'components/Section';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Get_All_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';

const AllBook = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);

  useEffect(() => {
    dispatch(Get_All_Book_Student_Initial());
  }, []);

  useEffect(() => {
    console.log(bookList);
  }, [bookList]);

  return (
    <Helmet title="Tài liệu">
      <Section>
        <SectionBody>
          <Row>
            <Col sm={3}>
              <Filter />
            </Col>
            <Col sm={9}>
              <div className="book__container main">
                <div className="book__container__header">
                  <div className="header__data">Trang 1 trong 6151 kết quả (0.1093984 giây)</div>
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
                  {bookList &&
                    bookList.map((book, idx) => (
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

                                <span>
                                  <i className="bx bxs-heart" style={{ color: '#ec1d25 ' }}></i>
                                  <span style={{ fontWeight: 'normal' }}>Lưu vào danh sách yêu thích</span>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default AllBook;
