import React, { useState } from 'react';

import FixedVirtualList from './FixedList';
import FixedHorizontalVirtualList from './FixedHorizontalList';
import FixedListControl from './FixedListControl';
import FixedInfiniteList from './FixedInfiniteList';

import DynamicVirtualList from './DynamicList';
import DynamicHorizontalVirtualList from './DynamicHorizontalList';
import DynamicListControl from './DynamicListControl';
import DynamicInfiniteList from './DynamicInfiniteList';

import './index.css';

const Examples: Record<string, React.FC> = {
  'fixed-list': FixedVirtualList,
  'fixed-horizontal-list': FixedHorizontalVirtualList,
  'fixed-list-control': FixedListControl,
  'fixed-infinite-list': FixedInfiniteList,
  'dynamic-list': DynamicVirtualList,
  'dynamic-horizontal-list': DynamicHorizontalVirtualList,
  'dynamic-list-control': DynamicListControl,
  'dynamic-infinite-list': DynamicInfiniteList,
};

function Guide() {
  return (
    <div className='Guide'>
      {Object.keys(Examples).map((exampleTitle, key) => {
        return (
          <a key={key} href={`/${exampleTitle}`}>
            {exampleTitle
              .split('-')
              .map((str) => `${str[0].toUpperCase() + str.slice(1)}`)
              .join(' ')}
          </a>
        );
      })}
    </div>
  );
}

function App() {
  const Render = Examples[window.location.pathname.slice(1)] ?? Guide;

  return (
    <div className='App'>
      <Render />
    </div>
  );
}

export default App;
