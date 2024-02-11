# tanstack-virtual-list

![NPM Version](https://img.shields.io/npm/v/tanstack-virtual-list)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/tanstack-virtual-list/%40tanstack%2Freact-virtual)

Ready-to-use virtual list component in React, built on top of [@tanstack/react-virtual](https://tanstack.com/virtual/v3/docs/framework/react/react-virtual), with built-in support for dynamic subitems, infinite loading, and custom scroll-to functions.

You can visit live demo [here](https://tanstack-virtual-list.vercel.app/).

## Installation

```bash
npm install tanstack-virtual-list
yard add tanstack-virtual-list
pnpm install tanstack-virtual-list
```

## Usage

The `tanstack-virtual-list` package is as consistent as possible with the API of `@tanstack/react-virtual`, but has additional dataSource and renderItem properties for rendering list elements, plus you can provide additional properties directly to the useVirtualizer via `props. useVirtualizerOptions` to provide additional properties directly to the core method useVirtualizer.

```tsx
import React from 'react';
import VirtualList from 'tanstack-virtual-list';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

export default function App() {
  return (
    <>
      <VirtualList
        dataSource={DataSource}
        getItemHeight={() => 50}
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
```

## Dynamic Virtual List

The `tanstack-virtual-list` package provides support for **virtual list with subitems of variable height** via `props.dynamic`. Internally, `tanstack-virtual-list` renders the list using the specialized `DynamicVirtualList`, which has a slightly different layout and configuration of the list, list container, and subitem containers, as compared to when the list is using fixed height.

```tsx
import React from 'react';
import VirtualList from 'tanstack-virtual-list';

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
        getItemHeight={() => 60}
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

```

## Custom and Preset `scrollToFn`

The original `@tanstack/react-virtual` package provides `scrollToFn` to customize the scrolling behavior, including the animation curve of the scrolling, etc. `tanstack-virtual-list` has a set of built-in scrollToFn implementations that use different animation curves, which you can apply by importing them and configuring them for the `<VirtualList />` component.

```tsx
import React from 'react';
import VirtualList, { easeInOutScrollToFn } from 'tanstack-virtual-list';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

export default function App() {
  return (
    <>
      <VirtualList
        scrollToFn={easeInOutScrollToFn}
        getItemHeight={() => 50}
        dataSource={DataSource}
        getItemKey={(item, index) => item}
        renderItem={(item, index) => <></>}
      />
    </>
  );
}
```

## Infinite Loading

To simplify the use in infinite loading scenarios, `tanstack-virtual-list` package provides a `<Loader />` export, which is a simple wrapper based on `IntersectionObserver`, and you can trigger the behavior of loading the next page of data through its `onAppear` event.

```tsx
import React, { useEffect, useState } from 'react';
import VirtualList, { Loader } from 'tanstack-virtual-list';

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
    console.log('Loader appears, fetching next page...');
    setPageNo((no) => no + 1);
  };

  return (
    <>
      {dataSource.length ? (
        <VirtualList
          getItemHeight={() => 50}
          buffer={5}
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
```

In this example we place `<Loader />` in the last position of data sources(by `dataSource.concat(['_Loader_'])`)，and render `<Loader />` in `renderItem` function. You can also place it in anywhere you like.
