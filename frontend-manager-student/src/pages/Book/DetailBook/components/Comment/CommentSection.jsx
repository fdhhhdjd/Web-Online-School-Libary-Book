//!LIBRARY
import { Row } from 'react-bootstrap';

//! COMPONENT
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import HELPERS from 'utils/helper';
import { useContext } from 'react';
import { store_library_school_contextUser } from 'contexts/global_context';
import { useEffect } from 'react';
import { Get_Comment_Initial } from 'redux/student/comment_slice/comment_thunk';
import { useState } from 'react';
import { reset_comment } from 'redux/student/comment_slice/comment_slice';

const CommentSection = () => {
  // state
  const [allComments, setAllComments] = useState(null);

  // context
  const dataContext = useContext(store_library_school_contextUser);
  const [showLogin, setShowLogin] = dataContext.login;

  // redux
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.all_comments?.element?.result);
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);
  const profile = useSelector((state) => state.auth_student.profile_student);
  const newCommentList = HELPERS.mergeCommentArray(allComments);

  useEffect(() => {
    if (detailBook?.book_id) {
      dispatch(Get_Comment_Initial({ book_id: detailBook?.book_id })).then((result) => {
        console.log(result);
      });
    }
  }, []);

  useEffect(() => {
    setAllComments(commentList);
    console.log('added comment');
  }, [commentList]);

  console.log(newCommentList, 'new list');

  return (
    <div className="book__view__comment__content">
      <Row className="comment__input">
        {profile ? (
          <CommentInput slug="" />
        ) : (
          <div style={{ display: 'block', margin: '2rem auto 0 auto', fontSize: '2rem', fontWeight: 700 }}>
            Vui lòng{' '}
            <span
              style={{ color: 'rgb(9 30 75/1)', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setShowLogin(true)}
            >
              đăng nhập
            </span>{' '}
            để bình luận!
          </div>
        )}
        <div className="comment__card">
          {newCommentList?.map((item, idx) => (
            <div key={idx} className="comment__card__item">
              <CommentCard data={item} />
            </div>
          ))}

          <div className="comment__card__see-more">Hiện thêm bình luận</div>
        </div>
      </Row>
    </div>
  );
};

export default CommentSection;
