//! LIBRARY
import { Rating } from '@mui/material';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

//! SHARE
import HELPERS from 'utils/helper';

//! COMPONENT
import InputNumber from 'components/InputNumber';
import Section, { SectionBody } from 'components/Section';
import CommentSection from './Comment/CommentSection';
import DetailBookSkeleton from './DetailBookSkeleton';

const TabDetailBook = ({ detailBook, loading }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleBorrowBook = () => {
    HELPERS.handleBorrowBook(detailBook, quantity, dispatch);
  };

  const handleFavorite = (book_id) => {
    HELPERS.handleFavoriteBook(book_id, dispatch);
  };

  return (
    <Section>
      <SectionBody>
        <div className="book__view main">
          {!loading ? (
            <Row>
              <Row>
                <Col md={8}>
                  <Row>
                    <Col md={12}>
                      <div className="book__view__name">
                        <span>{detailBook?.name}</span>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="book__view__image">
                        <img src={detailBook?.image_uri} alt="" />
                      </div>
                    </Col>
                    <Col md={9}>
                      <div className="book__view__data">
                        <div className="book__view__data__rate">
                          <span>Đánh giá:</span>
                          <Rating value={detailBook?.star} readOnly /> ({detailBook?.star} điểm /{' '}
                          {detailBook?.total_rating} lượt đánh giá)
                        </div>
                        <div className="book__view__data__author">
                          Tác giả: <span>{detailBook?.name_author}</span>
                        </div>
                        <div className="book__view__data__id">
                          Mã sách: <span style={{ fontStyle: 'italic' }}>{detailBook?.book_id}</span>
                        </div>
                        <div className="book__view__data__publisher">
                          Nhà xuất bản: <span>Tuổi trẻ</span>
                        </div>
                        <div className="book__view__data__page">
                          Số trang: <span>{detailBook?.page_number}</span>
                        </div>
                        <div className="book__view__data__language">
                          Ngôn ngữ: <span>{detailBook?.language}</span>
                        </div>
                        <div className="book__view__data__quantity">
                          <InputNumber setNumber={setQuantity} number={quantity} />
                        </div>
                        <div className="book__view__btns">
                          <button className="borrow-btn" onClick={handleBorrowBook}>
                            Đăng kí mượn sách
                          </button>

                          <button className="like-btn" onClick={() => handleFavorite(detailBook?.book_id)}>
                            <i className="bx bxs-heart"></i> Yêu thích
                          </button>
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
                        Số bản hiện có: <span>{detailBook?.quantity}</span>
                      </div>
                      <div className="bookshelf">
                        Kệ: <span>{detailBook?.bookshelf}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Col md={8}>
                <div className="book__view__content">
                  <div className="book__view__content__title">
                    <span>Tóm tắt</span>
                  </div>
                  <div className="book__view__content__data">{detailBook?.description}</div>
                </div>
              </Col>
              <Col md={8}>
                <div className="book__view__comment">
                  <div className="book__view__comment__title">
                    <span>Bình luận</span>
                  </div>

                  <CommentSection />
                </div>
              </Col>
            </Row>
          ) : (
            <DetailBookSkeleton />
          )}
        </div>
      </SectionBody>
    </Section>
  );
};

export default TabDetailBook;
