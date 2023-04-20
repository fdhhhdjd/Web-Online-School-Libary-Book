import { Skeleton } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const DetailBookSkeleton = () => {
  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <div className="book__view__name">
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="200px" />
              </div>
            </Col>
            <Col md={3}>
              <div className="book__view__image">
                <Skeleton animation="wave" variant="rectangular" style={{ marginTop: 30 }} width={150} height={180} />
              </div>
            </Col>
            <Col md={9}>
              <div className="book__view__data">
                <div className="book__view__data__rate">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="200px" />
                </div>
                <div className="book__view__data__author">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="150px" />
                </div>
                <div className="book__view__data__id">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="250px" />
                </div>
                <div className="book__view__data__publisher">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="150px" />
                </div>
                <div className="book__view__data__page">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="150px" />
                </div>
                <div className="book__view__data__language">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="130px" />
                </div>
                <div className="book__view__btns">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="300px" />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="book__view__content">
                <div className="book__view__content__title">
                  <span>Tóm tắt</span>
                </div>
                <div className="book__view__content__data">
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="300px" />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="book__view__comment">
                <div className="book__view__comment__title">
                  <span>Bình luận</span>
                </div>
                <div className="book__view__comment__content"></div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <div className="book__view__location">
            <div className="book__view__location__title">Thông tin và vị trí của sách</div>
            <div className="book__view__location__data">
              <span>
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="150px" />
              </span>
              <div className="bookshelf">
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width="150px" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailBookSkeleton;
