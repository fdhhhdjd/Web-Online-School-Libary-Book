import Helmet from 'components/Helmet';
import Section, { SectionBody } from 'components/Section';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Get_Detail_Book_Student_Initial } from 'redux/student/book_slice/book_thunk';

const DetailBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);

  useEffect(() => {
    dispatch(Get_Detail_Book_Student_Initial({ id }));
  }, []);

  console.log(detailBook);
  return (
    <Helmet title="Harry Porter">
      <Section>
        <SectionBody>
          <div className="book__view main">
            {detailBook && (
              <Row>
                <Col md={8}>
                  <Row>
                    <Col md={12}>
                      <div className="book__view__name">
                        <span>{detailBook.name}</span>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="book__view__image">
                        <img
                          src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1673970039/ca-nhan/pngfind.com-harry-potter-books-png-6850968_rhzpav.png"
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col md={9}>
                      <div className="book__view__data">
                        <div className="book__view__data__rate">
                          Đánh giá:
                          <span className="book__view__data__rate-icon">
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                          </span>
                          (0 lượt đánh giá)
                        </div>
                        <div className="book__view__data__author">
                          Tác giả: <span>JK. Rowling</span>
                        </div>
                        <div className="book__view__data__id">
                          Mã sách: <span style={{ fontStyle: 'italic' }}>{detailBook.book_id}</span>
                        </div>
                        <div className="book__view__data__publisher">
                          Nhà xuất bản: <span>Tuổi trẻ</span>
                        </div>
                        <div className="book__view__data__page">
                          Số trang: <span>{detailBook.page_number}</span>
                        </div>
                        <div className="book__view__data__language">
                          Ngôn ngữ: <span>{detailBook.language}</span>
                        </div>
                        <div className="book__view__btns">
                          <Link to="/borrow">
                            <button className="borrow-btn">Đăng kí mượn sách</button>
                          </Link>

                          <Link to="/borrow">
                            <button className="like-btn">
                              <i className="bx bxs-heart"></i> Yêu thích
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="book__view__content">
                        <div className="book__view__content__title">
                          <span>Tóm tắt</span>
                        </div>
                        <div className="book__view__content__data">{detailBook.description}</div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="book__view__comment">
                        <div className="book__view__comment__title">
                          <span>Bình luận & đánh giá</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <div className="book__view__location">
                    <div className="book__view__location__title">Thông tin và vị trí của sách</div>
                    <div className="book__view__location__data">
                      <div className="quantity">
                        Số bản hiện có: <span>{detailBook.quantity}</span>
                      </div>
                      <div className="bookshelf">
                        Kệ: <span>{detailBook.bookshelf}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default DetailBook;
