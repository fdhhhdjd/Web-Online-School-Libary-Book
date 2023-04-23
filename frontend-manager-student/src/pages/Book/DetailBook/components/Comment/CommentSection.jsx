//!LIBRARY
import { Row } from 'react-bootstrap';

//! COMPONENT
import CONSTANTS from 'configs/constants';
import { store_library_school_contextUser } from 'contexts/global_context';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Comment_Initial } from 'redux/student/comment_slice/comment_thunk';
import HELPERS from 'utils/helper';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';

const CommentSection = () => {
  // state
  const [allComments, setAllComments] = useState(null);
  const [amountComment, setAmountComment] = useState(CONSTANTS.COMMENT.MAIN_COMMENT_RENDER_AMOUNT);
  const [newCommentList, setNewCommentList] = useState(null);

  // context
  const dataContext = useContext(store_library_school_contextUser);
  const [showLogin, setShowLogin] = dataContext.login;

  // redux
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.all_comments?.element?.result);
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);
  const profile = useSelector((state) => state.auth_student.profile_student);
  // const newCommentList = useRef(null);
  const amountMainComment = HELPERS.countMainComment(allComments);

  useEffect(() => {
    if (detailBook?.book_id) {
      dispatch(Get_Comment_Initial({ book_id: detailBook?.book_id }));
    }
  }, []);

  useEffect(() => {
    setAllComments(commentList);
  }, [commentList]);

  useEffect(() => {
    setNewCommentList(HELPERS.sliceComment(HELPERS.mergeCommentArray(allComments), amountComment));
  }, [amountMainComment, amountComment, allComments]);

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

          {amountMainComment > 0 &&
            amountMainComment > CONSTANTS.COMMENT.MAIN_COMMENT_RENDER_AMOUNT &&
            (amountMainComment > amountComment ? (
              <div
                className="comment__card__see-more"
                onClick={() => setAmountComment((prev) => prev + CONSTANTS.COMMENT.MAIN_COMMENT_RENDER_AMOUNT)}
              >
                Hiện thêm {CONSTANTS.COMMENT.MAIN_COMMENT_RENDER_AMOUNT} bình luận{' '}
                <i className="bx bx-chevron-down"></i>
              </div>
            ) : (
              <div
                className="comment__card__see-more"
                onClick={() => setAmountComment(CONSTANTS.COMMENT.MAIN_COMMENT_RENDER_AMOUNT)}
              >
                Thu gọn <i className="bx bx-chevron-up"></i>
              </div>
            ))}
        </div>
      </Row>
    </div>
  );
};

export default CommentSection;
