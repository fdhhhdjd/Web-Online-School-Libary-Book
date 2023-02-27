/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { memo } from 'react';
import { LEFT_ARROW, RIGHT_ARROW } from '../../imports/home_import/index';

const Arrow = ({ direction, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      css={css`
        display: flex;
        position: absolute;
        top: 50%;
        ${direction === 'right' ? `right: 25px` : `left: 25px`};
        height: 50px;
        width: 50px;
        justify-content: center;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;

        &:hover {
          transform: scale(1.1);
        }

        img {
          transform: translateX(${direction === 'left' ? '-2' : '2'}px);

          &:focus {
            outline: 0;
          }
        }
      `}
    >
      {direction === 'right' ? <img src={RIGHT_ARROW} alt="right" /> : <img src={LEFT_ARROW} alt="left" />}
    </div>
  );
};

export default memo(Arrow);
