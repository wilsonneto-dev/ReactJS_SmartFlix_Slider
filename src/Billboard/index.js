import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';

import './styles.scss';

export default ({ banners, timeInterval }) => {
  const [list, setList] = useState(banners);
  const [timer, setTimer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ulRef = useRef();

  let initialXBanner;
  let initialXMovment;

  useCallback(() => {
    initialXBanner = 0;
    initialXMovment = 0;
  }, [list]);

  useEffect(() => {
    console.log('useEffect');
    processUI();
  }, [currentIndex]);

  const startInterval = () => {
    return setTimer(
      setInterval(() => {
        setCurrentIndex(i => (i < list.length - 1 ? ++i : 0));
      }, timeInterval || 10000)
    );
  };

  const stopInterval = () => {
    clearInterval(timer);
  };

  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
  }, []);

  const dragStart = e => {
    e = e || window.event;
    ulRef.current.style.transition = '';
    initialXBanner = ulRef.current.offsetLeft;
    initialXMovment = e.clientX;
    console.log(`Iniciou em ${e.clientX}`);
  };

  const drag = e => {
    e = e || window.event;
    if (e.clientX !== 0) {
      const movmentOffset = e.clientX - initialXMovment;
      const newBannerPosition = initialXBanner + movmentOffset;
      ulRef.current.style.left = `${newBannerPosition}px`;
    }
  };

  const dragEnd = e => {
    e = e || window.event;

    const movmentOffset = e.clientX - initialXMovment;
    const newBannerPosition = initialXBanner + movmentOffset;
    initialXBanner = newBannerPosition;

    if (movmentOffset > 100) {
      movePrev();
    } else if (movmentOffset < -100) {
      moveNext();
    } else {
      processUI();
    }
  };

  const moveNext = () => {
    let nextPosition = currentIndex;
    if (currentIndex < list.length - 1) {
      nextPosition++;
    } else {
      processUI();
    }
    setCurrentIndex(nextPosition);
    console.log(`Move Next: ${nextPosition}`);
  };

  const movePrev = () => {
    let nextPosition = currentIndex;
    if (currentIndex > 0) {
      nextPosition--;
    } else {
      processUI();
    }
    setCurrentIndex(nextPosition);
    console.log(`Move Prev: ${nextPosition}`);
  };

  const goto = index => {
    setCurrentIndex(index);
  };

  const processUI = () => {
    const { offsetWidth } = ulRef.current;
    const nextLeftBannerPosition = currentIndex * offsetWidth;

    ulRef.current.style.transition = 'all 0.5s';
    ulRef.current.style.left = `-${nextLeftBannerPosition}px`;
    console.log(`proccess UI: ${nextLeftBannerPosition}`);
  };

  return (
    <div className="billboard-wrapper">
      <ul
        ref={ulRef}
        onMouseEnter={() => {
          stopInterval();
        }}
        onMouseLeave={() => {
          startInterval();
        }}
      >
        {list.map(({ image }, index) => (
          <li
            key={index}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDrag={drag}
          >
            <img src={image} alt="" />
          </li>
        ))}
      </ul>
      <div className="controls">
        <ul>
          {list.map(({ image }, index) => (
            <li
              onClick={() => {
                goto(index);
              }}
              className={clsx(currentIndex === index && 'active')}
              key={index}
            >
              i
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
