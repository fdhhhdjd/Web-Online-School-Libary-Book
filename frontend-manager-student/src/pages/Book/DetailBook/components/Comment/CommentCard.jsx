//! LIBRARY
import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

//! COMPONENT
import { store_library_school_contextUser } from 'contexts/global_context';
import CommentInput from './CommentInput';
import NOTIFICATION from 'utils/notification';

const CommentCard = ({ data }) => {
  // context
  const dataContext = useContext(store_library_school_contextUser);
  const [showCommentReply, setShowCommentReply] = dataContext.commentReply;
  const [showLogin, setShowLogin] = dataContext.login;

  // redux
  const profile = useSelector((state) => state.auth_student.profile_student?.data);

  const handleShowReply = () => {
    if (profile) {
      setShowCommentReply(!showCommentReply);
    } else {
      NOTIFICATION.notifyError('Vui lòng đăng nhập để bình luận');
      setShowLogin(true);
    }
  };

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

        {data?.sub_comment?.map((comment, idx) => (
          <Row className="comment__card" key={idx}>
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

              <div className="comment__card__item__response" onClick={() => handleShowReply()}>
                Phản hồi
              </div>
            </Col>
          </Row>
        ))}

        {showCommentReply && <CommentInput slug={data?.slug} />}
      </Col>
    </Row>
  );
};

export default CommentCard;
