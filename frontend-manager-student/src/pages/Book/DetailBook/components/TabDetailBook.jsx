import { Rating, Stack } from '@mui/material';
import Section, { SectionBody } from 'components/Section';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Borrow_Book_Student_Initial } from 'redux/student/borrow_book_slice/borrow_thunk';
import Swal from 'sweetalert2';

const TabDetailBook = ({ detailBook }) => {
  const dispatch = useDispatch();
  const borrowError = useSelector((state) => state.borrow?.error);
  console.log(borrowError);
  const handleBorrowBook = () => {
    Swal.fire({
      title: 'Xác nhận đăng kí mượn sách',
      text: 'Ấn "Xác nhận" để đăng kí mượn sách này',
      icon: 'warning',
      customClass: 'swal-wide',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        if (detailBook?.quantity > 0) {
          dispatch(Borrow_Book_Student_Initial({ book_id: detailBook.book_id })).then((result) => {
            if (result?.payload?.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi xử lý',
                text: 'Bạn chỉ được mượn tối đa 2 cuốn sách',
              });
            } else {
              Swal.fire({
                title: 'Đăng kí mượn sách thành công',
                text: 'Bạn có 24 giờ kể từ thời gian đăng kí mượn để lên thư viện ITC nhận sách. \n Nếu sau 24 giờ vẫn chưa lấy sách thì xem như đã hủy mượn sách',
                icon: 'success',
                customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Xác nhận',
              });
            }
          });
        }
      }
    });
  };
  return (
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
                      <img src={detailBook.image_uri} alt="" />
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
                        <button className="borrow-btn" onClick={handleBorrowBook}>
                          Đăng kí mượn sách
                        </button>

                        <button className="like-btn">
                          <i className="bx bxs-heart"></i> Yêu thích
                        </button>
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
                      <div className="book__view__rating">
                        <span className="book__view__rating__title">Đánh giá của bạn:</span>
                        <Stack spacing={1}>
                          <Rating className="rating" name="half-rating" defaultValue={2.5} precision={0.5} />
                        </Stack>
                        <div className="book__view__btn">
                          <button className="rate-btn">Đánh giá</button>
                        </div>
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
  );
};

export default TabDetailBook;
