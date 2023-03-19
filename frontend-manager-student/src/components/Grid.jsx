//! LIBRARY
import React from 'react';
import propTypes from 'prop-types';

const Grid = (props) => {
  const style = { gap: props.gap ? `${props.gap}px` : '0' };
  const col = `grid-col-${props.col}`;
  const mdCol = props.mdCol && `grid-col-md-${props.mdCol}`;
  const smCOl = props.smCol && `grid-col-sm-${props.smCol}`;

  return (
    <div className={`grid ${col} ${smCOl} ${mdCol}`} style={style}>
      {props.children}
    </div>
  );
};

Grid.propTypes = {
  col: propTypes.number.isRequired,
  mdCol: propTypes.number,
  smCol: propTypes.number,
  gap: propTypes.number,
};

export default Grid;
