//! LIBRARY
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Get_All_Borrowed_Book_Initial } from 'redux/student/borrow_book_slice/borrow_thunk';

//! DUMMY DATA
import { tabBorrowBook } from 'utils/dummy';
import HELPERS from 'utils/helper';

const BookBorrowInfo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);
  const lineRef = useRef(null);
  const borrowList = useSelector((state) => state.borrow?.all_borrow_list?.element?.result);
  const dispatch = useDispatch();

  const tabRefs = useMemo(() => {
    const refs = {};
    tabBorrowBook.forEach((item, idx) => {
      refs[idx] = React.createRef(null);
    });

    return refs;
  }, []);

  const handleSelectTab = (e, idx) => {
    console.log(idx, 'indexxx');
    let productFilter = [];
    setActiveTab(idx);
    switch (idx) {
      case 0:
        setProduct(borrowList);
        break;

      default:
        productFilter = borrowList?.filter((item) => item?.status === idx * 10);
        setProduct(productFilter);
    }
    lineRef.current.style.left = tabRefs[idx].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[idx].current.offsetWidth + 'px';
  };

  useEffect(() => {
    lineRef.current.style.left = tabRefs[0].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[0].current.offsetWidth + 'px';
  }, [tabRefs]);

  useEffect(() => {
    dispatch(Get_All_Borrowed_Book_Initial());
  }, []);

  useEffect(() => {
    setProduct(borrowList);
  }, [borrowList]);

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
            {product &&
              product?.map((book, indx) => (
                <div className="book__list__item" key={indx}>
                  <div className="book__list__item__name">
                    <Link to={`/detail-book/${2}`}>{book.name}</Link>
                  </div>
                  <Row>
                    <Col md={1} sm={3}>
                      <div className="book__list__item__img">
                        <img src={book.image_uri} alt="" />
                      </div>
                    </Col>
                    <Col md={11} sm={9}>
                      <div className="book__data">
                        <div className="book__data__author">
                          Tác giả: <Link to="/author">{book.name_author}</Link>
                        </div>
                        <div className="book__data__id">
                          Mã sách: <Link to="/album">{book.book_id}</Link>
                        </div>
                        <div className="book__data__publisher">
                          Ngày mượn:
                          <Link to="/publisher">
                            {book.start_date ? HELPERS.formatTimeWithDate(book.start_date) : 'Chưa xác nhận'}
                          </Link>
                        </div>
                        <div className="book__data__album">
                          Hạn trả:
                          <Link to="/album">
                            {book.start_date ? HELPERS.formatTimeWithDate(book.due_date) : 'Chưa xác nhận'}
                          </Link>
                        </div>
                        <div className="book__data__category">
                          <span>
                            Thể loại: <Link to="/category">Trinh thám</Link>
                          </span>

                          <span>
                            Tình trạng
                            <button className={HELPERS.getStatusBorrow(book.status).className}>
                              {HELPERS.getStatusBorrow(book.status, book.due_date).label}
                            </button>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBorrowInfo;
