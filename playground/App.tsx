import React, { useState } from 'react';

import FixedVirtualList from './FixedList';
import FixedListControl from './FixedListControl';

import './index.css';

function Guide() {
  return (
    <div className='Guide'>
      <a href='/fixed-list'>Fixed List</a>
      <a href='/fixed-list-control'>Fixed List Control</a>
      <a href='/dynamic-list'>Dynamic List</a>
      <a href='/dynamic-list-control'>Dynamic List Control</a>
      <a href='/dynamic-list-horizontal'>Dynamic List Horizontal</a>
      <a href='/infinite-list'>Infinite </a>
      <a href='/infinite-list-2'>Infinite List</a>
    </div>
  );
}

function App() {
  switch (window.location.pathname) {
    case '/fixed-list':
      return <FixedVirtualList />;
    case '/fixed-list-control':
      return <FixedListControl />;

    default:
      return <Guide />;
  }
}

export default App;
