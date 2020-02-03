import React, { useState } from 'react';
import './styles.scss';

export default ({ banners }) => {
  const [list, setList] = useState(banners);

  const dragStart = e => {
    e = e || window.event;
    if (e.type === 'touchmove') {
      console.log(e.touches[0].clientX);
    }
    console.log('drag start');
  };

  const dragEnd = e => {
    console.log('drag end');
  };

  const drag = e => {
    e = e || window.event;
    // if (e.type == 'touchmove') {
    console.log(e);
    // }
    // console.log('deag action');
  };

  return (
    <div className="billboard-wrapper">
      <ul>
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
