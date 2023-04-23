//! LIBRARY
import React from 'react';
import { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

//! COMPONENT
import { store_library_school_contextUser } from 'contexts/global_context';
import CommentInput from './CommentInput';
import NOTIFICATION from 'utils/notification';
import CommentCardItem from './CommentCardItem';
import { useEffect } from 'react';
import CONSTANTS from 'configs/constants';
import HELPERS from 'utils/helper';

const CommentCard = ({ data }) => {
  // context
  const dataContext = useContext(store_library_school_contextUser);
  const [showLogin, setShowLogin] = dataContext.login;

  // data
  const [showCommentReply, setShowCommentReply] = useState(false);
  const [commentReplyPreview, setCommentReplyPreview] = useState(null);
  const [subCommentList, setSubCommentList] = useState(null);
  const [amountComment, setAmountComment] = useState(CONSTANTS.COMMENT.SUB_COMMENT_RENDER_AMOUNT);
  const amountSubComment = data?.sub_comment.length;

  // redux
  const profile = useSelector((state) => state.auth_student.profile_student?.data);
  const { loading } = useSelector((state) => state.comment);

  const handleShowReply = () => {
    if (profile) {
      setShowCommentReply(!showCommentReply);
    } else {
      NOTIFICATION.notifyError('Vui lòng đăng nhập để bình luận');
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (!loading) {
      setCommentReplyPreview(null);
    }
  }, [loading]);

  useEffect(() => {
    setSubCommentList(HELPERS.sliceComment(data?.sub_comment, amountComment));
  }, [amountComment, amountSubComment, data?.sub_comment]);

  return (
    <Row className="comment__card">
      <Col md={2}>
        <label>
          <img src={data?.avatar_uri_user} alt="" />
        </label>
      </Col>
      <Col md={10}>
        <div className="comment__card__item__content">
          <div className="comment__card__header">
            <span className="comment__card__name">{data?.full_name}</span>
            <span className="comment__card__time">42 giây trước</span>
          </div>

          <div className="comment__card__body">{data?.content}</div>
        </div>

        <div className="comment__card__item__response" onClick={() => handleShowReply()}>
          Phản hồi
        </div>

        {subCommentList?.map((comment, idx) => (
          <React.Fragment key={idx}>
            <CommentCardItem comment={comment} handleShowReply={handleShowReply} />
          </React.Fragment>
        ))}

        {amountSubComment > 0 &&
          amountSubComment > CONSTANTS.COMMENT.SUB_COMMENT_RENDER_AMOUNT &&
          (amountSubComment > amountComment ? (
            <div
              className="comment__card__item__see-more"
              onClick={() => setAmountComment((prev) => prev + CONSTANTS.COMMENT.SUB_COMMENT_RENDER_AMOUNT)}
            >
              Xem thêm {CONSTANTS.COMMENT.SUB_COMMENT_RENDER_AMOUNT} phản hồi <i className="bx bx-chevron-down"></i>
            </div>
          ) : (
            <div
              className="comment__card__item__see-more"
              onClick={() => setAmountComment(CONSTANTS.COMMENT.SUB_COMMENT_RENDER_AMOUNT)}
            >
              Thu gọn <i className="bx bx-chevron-up"></i>
            </div>
          ))}

        {loading && commentReplyPreview && <CommentCardItem isPreview={true} comment={commentReplyPreview} />}

        {showCommentReply && (
          <CommentInput
            showCommentReply={showCommentReply}
            setShowCommentReply={setShowCommentReply}
            loading={loading}
            setCommentReplyPreview={setCommentReplyPreview}
            slug={data?.slug}
          />
        )}
      </Col>
    </Row>
  );
};

export default CommentCard;
