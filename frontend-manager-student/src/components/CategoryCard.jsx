//! LIBRARY
import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = (props) => {
  return (
    <div className="category-card">
      <div className="category-card__icon">
        <i className={props.icon}></i>
      </div>
      <div className="category-card__info">
        <div className="category-card__info__name">{props.name}</div>
        <div className="category-card__info__description">Xem thêm</div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CategoryCard;
