import React, { useRef } from 'react';

import VirtualList, { VirtualListRef } from '../src';

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
  const ref = useRef<VirtualListRef>(null);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => {
            ref.current?.scrollByOffset(50, {
              behavior: 'smooth',
            });
          }}
        >
          Scroll by 50px
        </button>
        <button
          onClick={() => {
            ref.current?.scrollToOffset(500, {
              behavior: 'smooth',
            });
          }}
        >
          Scroll to 500px
        </button>
        <button
          onClick={() => {
            ref.current?.scrollToIndex(50, {
              align: 'center',
              behavior: 'smooth',
            });
          }}
        >
          Scroll #50 into view
        </button>
      </div>
      <VirtualList
        dynamic
        className='List'
        getItemHeight={() => 50}
        dataSource={DataSource}
        getItemKey={(item, index) => item.id}
        renderItem={(item, index) => {
          return (
            <div
              className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              key={index}
              style={{
                flexDirection: 'column',
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
