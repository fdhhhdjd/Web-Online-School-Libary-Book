//! LIBRARY
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//! DUMMY DATA
import { tabBorrowBook } from 'utils/dummy';

const BookBorrowInfo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState('');
  const lineRef = useRef(null);

  const tabRefs = useMemo(() => {
    const refs = {};
    tabBorrowBook.forEach((item, idx) => {
      refs[idx] = React.createRef(null);
    });

    return refs;
  }, []);

  const handleSelectTab = (e, idx) => {
    setActiveTab(idx);
    setProduct('product ' + idx);
    lineRef.current.style.left = tabRefs[idx].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[idx].current.offsetWidth + 'px';
  };

  useEffect(() => {
    lineRef.current.style.left = tabRefs[0].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[0].current.offsetWidth + 'px';
  }, [tabRefs]);

  return (
    <div className="book_borrow_list">
      <div className="tabs">
        {tabBorrowBook &&
          tabBorrowBook.map((item, idx) => (
            <div
              className={`tab-item ${idx === activeTab ? 'active' : ''}`}
              onClick={(e) => handleSelectTab(e, idx)}
              ref={tabRefs[idx]}
              key={idx}
            >
              {item.displayText}
            </div>
          ))}
        <div className="line" ref={lineRef}></div>
      </div>

      <div className="tab-content">
        <div className="tab-pane active">
          <div className="book__list">
            <div className="book__list__item" key={1}>
              <div className="book__list__item__name">
                <Link to={`/detail-book/${2}`}>{'book.name'}</Link>
              </div>
              <Row>
                <Col md={1} sm={3}>
                  <div className="book__list__item__img">
                    <img
                      src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1673970039/ca-nhan/pngfind.com-harry-potter-books-png-6850968_rhzpav.png"
                      alt=""
                    />
                  </div>
                </Col>
                <Col md={11} sm={9}>
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
                      Mã sách: <Link to="/album">{'book.book_id'}</Link>
                    </div>
                    <div className="book__data__category">
                      <span>
                        Thể loại: <Link to="/category">Trinh thám</Link>
                      </span>

                      <span>
                        Tình trạng <button className="pending">Chờ xác nhận</button>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBorrowInfo;
