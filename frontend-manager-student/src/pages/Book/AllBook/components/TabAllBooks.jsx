/* eslint-disable prettier/prettier */
//! LIBRARY
import { Col, Row } from 'react-bootstrap';

//! COMPONENT
import Filter from 'components/Filter';
import Section, { SectionBody } from 'components/Section';
import AllBookSkeleton from './AllBookSkeleton';
import BookCard from './BookCard';

const TabAllBooks = ({ bookList, currentPage, totalBook, executeTime, loading, category, major, textFilter }) => {
  // data

  return (
    <Section>
      <SectionBody>
        <Row>
          <Col sm={3}>
            <Filter category={category} major={major} />
          </Col>
          <Col sm={9}>
            <div className="book__container main">
              <div className="header__data__big">
                {textFilter}
              </div>
              <div className="book__container__header">
                <div className="header__data">
                  Trang {currentPage} trong {totalBook} kết quả ({bookList ? executeTime : 0} giây)
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
                    <BookCard book={book} key={idx} />
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
