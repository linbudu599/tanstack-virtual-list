import React, { useEffect, useState } from 'react';
import { Text } from '@geist-ui/core';

import VirtualList, { Loader } from '../src';

interface ResStruct {
  data: {
    pageNo: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    data: string[];
  };
}

const MaxPageNo = 999;
const PageSize = 10;

async function mockRes(pageNo: number): Promise<ResStruct> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          pageNo,
          pageSize: PageSize,
          total: PageSize * MaxPageNo,
          hasNext: pageNo < MaxPageNo,
          data: new Array(PageSize).fill(0).map((e, i) => {
            return `Async Loaded(No.${
              pageNo * 10 + i
            }). (Page ${pageNo}, Index ${i}))`;
          }),
        },
      });
    }, 1000);
  });
}

export default function App() {
  const [pageNo, setPageNo] = useState(0);
  const [fetchingNextPage, setFetchingNextPage] = useState(false);
  const [dataSource, setDataSource] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchNextPage = async (pageNo = 0) => {
    console.log('Fetching', pageNo);
    setFetchingNextPage(true);
    const res = await mockRes(pageNo);
    console.log('√ Fetched', pageNo);

    setFetchingNextPage(false);
    setDataSource([...dataSource, ...res.data.data]);
    setHasNextPage(res.data.hasNext);
  };

  useEffect(() => {
    if (fetchingNextPage || !hasNextPage) return;
    fetchNextPage(pageNo);
  }, [pageNo]);

  const handleLoaderAppear = () => {
    setPageNo((no) => no + 1);
  };

  return (
    <>
      <Text
        h4
        style={{
          textAlign: 'center',
        }}
      >
        Status:{' '}
        {hasNextPage ? (fetchingNextPage ? 'Fetching...' : 'Ready') : 'No More'}
      </Text>
      {dataSource.length ? (
        <VirtualList
          className='List'
          dynamic
          getItemHeight={() => 50}
          buffer={5}
          style={{
            marginTop: '15px',
          }}
          dataSource={dataSource.concat(['_Loader_'])}
          getItemKey={(item, index) => item}
          renderItem={(item, index) => {
            const isLoaderItem = index > dataSource.length - 1;

            return (
              <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
                {isLoaderItem ? (
                  <>
                    <Loader onAppear={handleLoaderAppear} />
                    <span>
                      {hasNextPage ? 'Loading more...' : 'Nothing more to load'}
                    </span>
                  </>
                ) : (
                  <span>{item}</span>
                )}
              </div>
            );
          }}
        />
      ) : null}
    </>
  );
}
