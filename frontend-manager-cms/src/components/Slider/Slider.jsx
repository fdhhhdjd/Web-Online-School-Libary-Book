import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import Dots from './Dots';
import Slide from './Slide';
import SliderContent from './SliderContent';

const getWidth = () => window.innerWidth;

/**
 * @function Slider
 */
const Slider = (props) => {
  const { slides } = props;

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    transitioning: false,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { activeSlide, translate, _slides, transition, transitioning } = state;

  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();
  const sliderRef = useRef();
  const throttleRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
    throttleRef.current = throttleArrows;
  });

  useEffect(() => {
    const slider = sliderRef.current;

    const smooth = (e) => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const throttle = (e) => {
      if (e.target.className.includes('SliderContent')) {
        throttleRef.current();
      }
    };

    slider.addEventListener('transitionstart', throttle);
    slider.addEventListener('transitionend', smooth);
    window.addEventListener('resize', resize);

    return () => {
      slider.removeEventListener('transitionstart', throttle);
      slider.removeEventListener('transitionend', smooth);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    let interval = null;

    if (props.autoPlay) {
      interval = setInterval(play, props.autoPlay * props.timeOut);
    }

    return () => {
      if (props.autoPlay) {
        clearInterval(interval);
      }
    };
  }, [activeSlide, props.autoPlay]);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45, transitioning: false });
  }, [transition]);

  const throttleArrows = () => {
    setState({ ...state, transitioning: true });
  };

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };

  const nextSlide = () => {
    if (transitioning) return;

    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  const prevSlide = () => {
    if (transitioning) return;

    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });
  };

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1) _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth(),
    });
  };

  return (
    <div ref={sliderRef} className="main slider-main">
      <SliderContent translate={translate} transition={transition} width={getWidth() * _slides.length}>
        {_slides.map((_slide, i) => (
          <Slide width={getWidth()} key={_slide + i} content={_slide} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={slides} activeSlide={activeSlide} />
    </div>
  );
};

export default Slider;
