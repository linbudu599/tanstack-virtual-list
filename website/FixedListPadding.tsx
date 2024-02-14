import React from 'react';
import VirtualList from '../src';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

export default function App() {
  return (
    <>
      <VirtualList
        className='List'
        getItemHeight={() => 50}
        dataSource={DataSource}
        padding={50}
        getItemKey={(item, index) => item}
        renderItem={(item, index) => {
          return (
            <div className={index % 2 === 0 ? 'ListItemOdd' : 'ListItemEven'}>
              ITEM {item}
            </div>
          );
        }}
      />
    </>
  );
}
