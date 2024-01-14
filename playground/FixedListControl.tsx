import React, { useEffect, useRef } from 'react';
import VirtualList, { VirtualListRef } from '../src';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

export default function App() {
  const ref = useRef<VirtualListRef>(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <>
      <VirtualList
        ref={ref}
        className='List'
        getItemHeight={() => 50}
        dataSource={DataSource}
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
