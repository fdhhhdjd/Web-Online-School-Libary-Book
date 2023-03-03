import Helmet from 'components/Helmet';
import Section, { SectionBody } from 'components/Section';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DetailBook = () => {
  return (
    <Helmet title="Harry Porter">
      <Section>
        <SectionBody>
          <div className="book__view main">
            <Row>
              <Col md={8}>
                <Row>
                  <Col md={12}>
                    <div className="book__view__name">
                      <span>Harry Potter</span>
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
                          <i class="bx bx-star"></i>
                          <i class="bx bx-star"></i>
                          <i class="bx bx-star"></i>
                          <i class="bx bx-star"></i>
                          <i class="bx bx-star"></i>
                        </span>
                        (0 lượt đánh giá)
                      </div>
                      <div className="book__view__data__author">
                        Tác giả: <span>JK. Rowling</span>
                      </div>
                      <div className="book__view__data__id">
                        Mã sách: <span style={{ fontStyle: 'italic' }}>501210646</span>
                      </div>
                      <div className="book__view__data__publisher">
                        Nhà xuất bản: <span>Tuổi trẻ</span>
                      </div>
                      <div className="book__view__data__page">
                        Số trang: <span>52</span>
                      </div>
                      <div className="book__view__data__language">
                        Ngôn ngữ: <span>Tiếng Việt</span>
                      </div>
                      <div className="book__view__btns">
                        <Link to="/borrow">
                          <button className="borrow-btn">Đăng kí mượn sách</button>
                        </Link>

                        <Link to="/borrow">
                          <button className="like-btn">
                            <i class="bx bxs-heart"></i> Yêu thích
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
                      <div className="book__view__content__data">
                        Harry Potter là một loạt tiểu thuyết huyền bí gồm bảy phần của nhà văn Anh Quốc J. K. Rowling.
                        Bộ truyện viết về những cuộc phiêu lưu phù thủy của cậu bé Harry Potter cùng hai người bạn thân
                        là Ron Weasley và Hermione Granger, lấy bối cảnh tại Trường Phù thủy và Pháp sư Hogwarts ở nước
                        Anh. Những cuộc phiêu lưu tập trung vào cuộc chiến của Harry Potter trong việc chống lại tên
                        Chúa tể hắc ám Voldemort – người có tham vọng muốn trở nên bất tử, thống trị thế giới phù thủy,
                        nô dịch hóa những người phi pháp thuật và tiêu diệt những ai cản đường hắn, đặc biệt là Harry
                        Potter.
                      </div>
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
                      Số bản hiện có: <span>1</span>
                    </div>
                    <div className="bookshelf">
                      Kệ: <span>1A</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default DetailBook;
