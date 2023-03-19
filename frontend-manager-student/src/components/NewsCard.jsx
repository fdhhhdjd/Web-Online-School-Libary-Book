//! LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = (props) => {
  return (
    <div className={`news-card ${props.horizontal && 'horizontal'}`}>
      <div
        className={`news-card__thumbnail
                   ${props.thumbnailSize === 'sm' && 'news-card__thumbnail-sm'}`}
      >
        <img src={props.thumbnail} alt="" />
      </div>
      <div className="news-card__info">
        <div className="news-card__info__date">{props.date}</div>
        <div className="news-card__info__name">{props.name}</div>
        <div className="news-card__info__description">{props.desc}</div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  horizontal: PropTypes.bool,
};

export default NewsCard;
