import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import './styles.scss';

import _ from 'lodash';

export default () => {
  const movies = _.range(30);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [length, setLength] = useState(movies.length);
  const [totalPage, setTotalPages] = useState(Math.ceil(length / perPage));

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
  }, [currentPage]);

  const processUi = () => {
    const { offsetWidth } = refSliderInnerWrapper.current;
    console.log(`${-offsetWidth * currentPage}px`);
    refSliderUL.current.style.left = `${-offsetWidth * currentPage}px`;
  };

  return (
    <>
      <div
        className={clsx(
          'wrapper',
          currentPage === 0 && 'firstPage',
          currentPage + 1 === totalPage && 'lastPage'
        )}
      >
        <div className="innerWrapper" ref={refSliderInnerWrapper}>
          <ul ref={refSliderUL}>
            {movies.map(i => (
              <li key={i}>
                <div className="item">
                  <span>
                    {i + 1} <i className="fas fa-rocket"></i>
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
