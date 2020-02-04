import React, { useState, useCallback, useRef } from 'react';
import './styles.scss';

export default ({ banners }) => {
  const [list, setList] = useState(banners);
  const ulRef = useRef();

  let initialXBanner;
  let initialXMovment;

  useCallback(() => {
    initialXBanner = 0;
    initialXMovment = 0;
  }, [list]);

  const dragStart = e => {
    e = e || window.event;
    ulRef.current.style.transition = '';
    initialXBanner = ulRef.current.offsetLeft;
    initialXMovment = e.clientX;
    console.log(`Iniciou em ${e.clientX}`);
  };

  const dragEnd = e => {
    e = e || window.event;

    const movmentOffset = e.clientX - initialXMovment;
    const newBannerPosition = initialXBanner + movmentOffset;
    initialXBanner = newBannerPosition;

    if (initialXBanner > 0) {
      initialXBanner = 0;
      ulRef.current.style.transition = 'all 0.5s';
      ulRef.current.style.left = `${initialXBanner}px`;
    }
  };

  const drag = e => {
    e = e || window.event;
    if (e.clientX != 0) {
      const movmentOffset = e.clientX - initialXMovment;
      const newBannerPosition = initialXBanner + movmentOffset;
      console.log(`movment offset: ${movmentOffset}`);
      console.log(`new banner position: ${newBannerPosition}\n`);
      ulRef.current.style.left = `${newBannerPosition}px`;
    }
  };

  return (
    <div className="billboard-wrapper">
      <ul ref={ulRef}>
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
    </div>
  );
};
