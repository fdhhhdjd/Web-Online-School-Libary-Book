import { Modal, Rating, Stack } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Create_Rating_Cms_Initial } from 'redux/student/rating_slice/rating_thunk';

const RatingModal = ({ open, setOpen, data }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(2);

  const handleRating = () => {
    dispatch(
      Create_Rating_Cms_Initial({
        borrowed_book_id: data.borrowed_book_id,
        book_id: data.book_id,
        rating,
      }),
    );

    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="modal-box">
        <div className="modal-title">Đánh giá</div>
        <div className="modal-desc">
          Hãy đánh giá cho tài liệu <span className="book-name">"{data?.name}"</span>
        </div>
        <Stack spacing={1}>
          <Rating
            className="rating"
            name="half-rating"
            value={rating}
            defaultValue={2.5}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Stack>
        <div className="book__view__btn">
          <button className="rate-btn" onClick={handleRating}>
            Đánh giá
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
