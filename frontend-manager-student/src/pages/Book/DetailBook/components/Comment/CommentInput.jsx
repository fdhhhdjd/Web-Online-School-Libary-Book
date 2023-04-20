//! LIBRARY
import { TextareaAutosize } from '@mui/material';
import { store_library_school_contextUser } from 'contexts/global_context';
import { useContext } from 'react';
import { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Create_Comment_Initial } from 'redux/student/comment_slice/comment_thunk';

const CommentInput = ({ slug }) => {
  const textRef = useRef();

  // context
  const dataContext = useContext(store_library_school_contextUser);
  const [showCommentReply, setShowCommentReply] = dataContext.commentReply;

  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth_student.profile_student?.data);
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);

  const handlePostComment = () => {
    dispatch(
      Create_Comment_Initial({
        book_id: detailBook?.book_id,
        parent_slug: slug,
        content: textRef.current.value,
      }),
    );

    setShowCommentReply(false);

    console.log({
      book_id: detailBook?.book_id,
      parent_slug: slug,
      content: textRef.current.value,
    });
  };
  return (
    <Row className="comment">
      <Col md={2}>
        <label htmlFor="comment">
          <img src={profile?.avatar_uri} alt="" />
        </label>
      </Col>
      <Col md={10}>
        <TextareaAutosize
          placeholder="Viết bình luận của bạn ở đây..."
          className="comment__input__box"
          id="comment"
          minRows={4}
          maxRows={8}
          ref={textRef}
        />
        <button className="comment__input__btn submit-btn" onClick={handlePostComment}>
          Đăng
        </button>
      </Col>
    </Row>
  );
};

export default CommentInput;
