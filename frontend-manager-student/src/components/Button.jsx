import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
  const size = props.size && 'btn-' + props.size;
  return (
    <button
      className={`btn ${bg} ${size}`}
      style={props.color && { background: `${props.color}` }}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      <span className="btn__text">{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
