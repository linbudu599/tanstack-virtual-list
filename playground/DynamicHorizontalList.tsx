import React from 'react';
import VirtualList from '../src';

const DataSource = Array.from({ length: 1000 }).map((_, i) => ({
  id: i,
  text: Array.from(
    {
      length: Math.floor(Math.random() * 7) + 2,
    },
    (_, index) => <p key={`${i}_${index}`}>ITEM {i}</p>
  ),
}));

export default function App() {
  return (
    <>
      <VirtualList
        dynamic
        horizontal
        className='List'
        // DOESNOT WORKS ACTUALLY
        getItemHeight={() => 60}
        dataSource={DataSource}
        getItemKey={(item, index) => item.id}
        renderItem={(item, index) => {
          return (
            <div
              className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              key={index}
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}
            >
              {item.text}
            </div>
          );
        }}
      />
    </>
  );
}
