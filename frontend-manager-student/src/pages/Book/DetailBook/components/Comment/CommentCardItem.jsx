import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CommentCardItem = ({ comment, handleShowReply, isPreview }) => {
  return (
    <Row className={`comment__card ${isPreview ? 'comment__card__preview' : ''}`}>
      <Col md={2}>
        <label>
          <img src={comment?.avatar_uri_user} alt="" />
        </label>
      </Col>
      <Col md={10}>
        <div className="comment__card__item__content">
          <div className="comment__card__header">
            <span className="comment__card__name">{comment?.full_name}</span>
            <span className="comment__card__time">42 giây trước</span>
          </div>

          <div className="comment__card__body">{comment?.content}</div>
        </div>

        {!isPreview && (
          <div className="comment__card__item__response" onClick={() => handleShowReply()}>
            Phản hồi
          </div>
        )}
      </Col>
    </Row>
  );
};

export default CommentCardItem;
