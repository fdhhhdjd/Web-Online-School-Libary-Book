import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const BookCard = (props) => {
  return (
    <div className="book-card">
      <Link to={`/catalogue/${props.slug}`}>
        <div className="book-card__image">
          <img src={props.img01} alt="" />
        </div>
        <h3 className="book-card__name">{props.name}</h3>
        <h3 className="book-card__author">{props.author}</h3>
      </Link>
      <div className="book-card__btn">
        <Button size="sm">Xem chi tiết</Button>
      </div>
    </div>
  );
};

export default BookCard;
