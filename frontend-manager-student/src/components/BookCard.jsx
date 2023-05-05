//! LIBRARY
import React from 'react';
import { Link } from 'react-router-dom';

//! COMPONENTS
import Button from './Button';

const BookCard = (props) => {
  return (
    <div className="book-card">
      <Link to={`/book/${props.slug}`}>
        <div className="book-card__image">
          <img src={props.img01} alt="" />
        </div>
        <h3 className="book-card__name">{props.name}</h3>
        <h3 className="book-card__author">{props.author}</h3>
      </Link>
      <div className="book-card__btn">
        <Link to={`/book/${props.slug}`}>
          <Button size="sm">Xem chi tiết</Button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
