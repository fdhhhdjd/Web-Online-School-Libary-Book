//! LIBRARY
import { Skeleton } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const AllBookSkeleton = ({ amount }) => {
  return Array.from(new Array(amount || 1)).map((item, idx) => (
    <div className="book__list__item" key={idx}>
      <div className="book__list__item__name">
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="200px" />
      </div>
      <Row>
        <Col sm={1}>
          <div className="book__list__item__img">
            <Skeleton animation="wave" variant="rectangular" width={130} height={150} />
          </div>
        </Col>
        <Col sm={11}>
          <div className="book__data">
            <div className="book__data__author">
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="200px" />
            </div>
            <div className="book__data__publisher">
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="180px" />
            </div>
            <div className="book__data__album">
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="160px" />
            </div>
            <div className="book__data__id">
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="180px" />
            </div>
            <div className="book__data__category">
              <span>
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="230px" />
              </span>

              <span>
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.6rem' }} width="200px" />{' '}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  ));
};

export default AllBookSkeleton;
