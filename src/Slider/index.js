import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import './styles.scss';

export default ({ items, _heigthIndex }) => {
  const movies = items;
  const heigthIndex = _heigthIndex || 1.5;

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [length, setLength] = useState(movies.length);
  const [totalPage, setTotalPages] = useState(Math.ceil(length / perPage));
  const [itemHeight, setItemHeight] = useState(0);

  const refSliderInnerWrapper = useRef();
  const refSliderUL = useRef();

  const nextPage = () => {
    if (currentPage + 1 < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    processUi();
    getItemHeight();
  }, [currentPage]);

  const getItemHeight = () => {
    const { offsetWidth } = refSliderInnerWrapper.current;
    setItemHeight((offsetWidth / perPage) * heigthIndex);
  };

  const processUi = () => {
    // to move the ul element
    const { offsetWidth } = refSliderInnerWrapper.current;
    refSliderUL.current.style.left = `${-offsetWidth * currentPage}px`;
  };

  const isSpecialClass = index => {
    if ((index + 1) % 8 == 0) {
      refSliderUL.current.classList.add('slider-fullleft');
      console.log('full');
    }
  };

  const leaveSpecialClass = index => {
    if ((index + 1) % 8 == 0) {
      refSliderUL.current.classList.remove('slider-fullleft');
    }
  };

  return (
    <>
      <div
        className={clsx(
          'wrapper',
          currentPage === 0 && 'firstPage',
          currentPage + 1 === totalPage && 'lastPage',
          length < perPage && 'single-page'
        )}
      >
        <div className="innerWrapper" ref={refSliderInnerWrapper}>
          <ul ref={refSliderUL}>
            {movies.map((i, index) => (
              <li
                key={i}
                onMouseEnter={() => {
                  isSpecialClass(index);
                }}
                onMouseLeave={() => {
                  leaveSpecialClass(index);
                }}
                style={{ height: `${itemHeight}px` }}
              >
                <div className="item">
                  <span>
                    {i + 1} <i className="fas fa-rocket"></i>&nbsp;
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="controls">
          <div
            className="control prev"
            onClick={() => {
              prevPage();
            }}
          >
            <i className="fas fa-caret-left"></i>
          </div>
          <div
            className="control next"
            onClick={() => {
              nextPage();
            }}
          >
            <i className="fas fa-caret-right"></i>
          </div>
        </div>
      </div>

      <div className="infos">
        items: {length} <br />
        perPages: {perPage} <br />
        pages: {totalPage} <br />
        currentPage: {currentPage}
      </div>
    </>
  );
};
