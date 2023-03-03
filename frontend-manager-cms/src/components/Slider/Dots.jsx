/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';

const Dot = ({ active }) => {
  return (
    <span
      css={css`
        padding: 10px;
        margin-right: 5px;
        cursor: pointer;
        border-radius: 50%;
        background: ${active ? '#ec1d25' : 'white'};
      `}
    />
  );
};

const MemoDot = memo(Dot);

const Dots = ({ slides, activeSlide }) => {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {slides.map((slide, i) => (
        <MemoDot key={slide} active={activeSlide === i} />
      ))}
    </div>
  );
};

export default Dots;
