/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';

const Slide = ({ content, width }) => {
  return (
    <div
      css={css`
        height: 100%;
        width: ${width}px;
        background-image: url('${content}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `}
    />
  );
};

export default memo(Slide);
