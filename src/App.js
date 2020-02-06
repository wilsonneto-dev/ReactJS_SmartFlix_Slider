import React from 'react';

import Slider from './Slider';
import Billboard from './Billboard';
import Loading from './Loading';

import _ from 'lodash';

const bannersArray = [
  {
    image:
      'https://ottvsimg.ottvs.com.br/res/banner/1d6c0558-f913-4b67-83f4-d3df2d283d5a.jpg'
  },
  {
    image:
      'https://ottvsimg.ottvs.com.br/res/banner/b8df3ccd-3426-4864-9a8a-434f6d7ab2a0.jpg'
  },
  {
    image:
      'https://ottvsimg.ottvs.com.br/res/banner/d612f098-c845-4633-81e6-2f04c728104a.jpg'
  }
];

function App() {
  return (
    <div className="main">
      <Slider items={_.range(16)} />
      <Billboard banners={bannersArray} />
      <Loading />
    </div>
  );
}

export default App;
