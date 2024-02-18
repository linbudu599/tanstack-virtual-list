# tanstack-virtual-list

![NPM Version](https://img.shields.io/npm/v/tanstack-virtual-list)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/tanstack-virtual-list/%40tanstack%2Freact-virtual)

Ready-to-use virtual list component in React, built on top of [@tanstack/react-virtual](https://tanstack.com/virtual/v3/docs/framework/react/react-virtual), with built-in support for dynamic subitems and infinite loading.

- [Visit live demo here](https://tanstack-virtual-list.vercel.app/)
- [Configurations](#configurations)

## Installation

```bash
npm install tanstack-virtual-list
yard add tanstack-virtual-list
pnpm install tanstack-virtual-list
```

## Notes

- When using `dynamic` mode, imperative scroll control with `behavior: 'smooth'` doesnot works correctly, and you will see warning in devtool console by `@tanstack/react-virtual`:  

  > *The `smooth` scroll behavior is not fully supported with dynamic size.`*

- When using `dynamic` mode, infinite list can not works correctly as element rect meaturement failed.

## Usage

The `tanstack-virtual-list` package is as consistent as possible with the API of `@tanstack/react-virtual`, but has additional dataSource and renderItem properties for rendering list elements, plus you can provide additional properties directly to the useVirtualizer via `props.useVirtualizerOptions` to provide additional properties directly to the core method useVirtualizer.

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
        useVirtualizerOptions={{
          // ...
        }}
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
        // Remember to enable dynamic mode!
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

## Infinite Loading

To simplify the use in infinite loading scenarios, `tanstack-virtual-list` provides a `<Loader />` component, which is a simple wrapper based on `IntersectionObserver`, and you can trigger the behavior of loading the next page of data through its `onAppear` event.

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
    const res = await mockRequest(pageNo);
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
          overscan={5}
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

## Configurations

`tanstack-virtual-list` preserves serveral properties from `useVirtualizer` param, and, to prevent unknown DOM properties error, less commonly used properties will be placed in `useVirtualizerOptions`.

### `dataSource`

- `T[]`
- **Required**

The data source to render list items.
`tanstack-virtual-list` provides first-level typescript support, as it infers type of data item from `dataSource`.

### `renderItem`

- `(item: T, index: number, virtualItem: VirtualItem) => React.ReactNode`
- **Required**

Specify how to render item.

### `getItemHeight`

- `(item: TDataSource, index: number) => number`
- **Required**

Specify how to calculate item height.

This is also required when using `dynamic` mode as initial rect provider.

### `getItemKey`

- `(item: TDataSource, index: number) => React.Key`
- `default: (item, index) => index`

Specify how to get item's key.

If not specified, `tanstack-virtual-list` use item index as fallback.

### `dynamic`

- `boolean`
- `default: false`

Whether to enable dynamic mode.

Dynamic mode using a complete different layout compared to fixed mode, so make sure you need to use it indeed.

This is not a natively provided configuration, but used by `tanstack-virtual-list` it self.

### `horizontal`

- `boolean`
- `default: false`

Whether to use horizontal layout.

See [virtualizer#horizontal](https://tanstack.com/virtual/v3/docs/api/virtualizer#horizontal) for details.

### `overscan`

- `number`
- `default: 0`

See [virtualizer#overscan](https://tanstack.com/virtual/v3/docs/api/virtualizer#overscan) for details.

### `initialOffset`

- `number`
- `default: 0`

See [virtualizer#initialoffset](https://tanstack.com/virtual/v3/docs/api/virtualizer#initialoffset) for details.

### `prefixClassName`

- `string`
- `default: 'tanstack-virtual-list'`

This attribute is used internally in the component to determine the class name of layout containers, like:

- `div.tanstack-virtual-list-container`
  - `div.tanstack-virtual-list-content`
    - `div.tanstack-virtual-list-item`
    - `div.tanstack-virtual-list-item`
    - `div.tanstack-virtual-list-item`
    - ...

### `padding`

- `number | [start?: number, end?: number]`
- `default: 0`

A shortcut for [virtualizer#paddingstart](https://tanstack.com/virtual/v3/docs/api/virtualizer#paddingstart) | [virtualizer#paddingend](https://tanstack.com/virtual/v3/docs/api/virtualizer#paddingend) .

- `input: 10` → `output: [10, 10]`
- `input: [10, 20]` → `output: [10, 20]`

### `scrollPadding`

Nearly same to [padding](#padding).

See [virtualizer#scrollpaddingstart](https://tanstack.com/virtual/v3/docs/api/virtualizer#scrollpaddingstart) | [virtualizer#scrollpaddingend](https://tanstack.com/virtual/v3/docs/api/virtualizer#scrollpaddingend) for more details.

## `useVirtualizerOptions`

See [Virtualizer](https://tanstack.com/virtual/v3/docs/api/virtualizer) here for more configurations on `@tanstack/react-virtual`.

## Ref

`tanstack-virtual-list` provides ref expose and corresponding typing：

```typescript
import React, { useRef } from 'react';

import VirtualList, { type VirtualListRef } from tanstack-virtual-list';

export default function App() {
  const ref = useRef<VirtualListRef>(null);

  const scrollTo20 = () => {
    ref.current?.scrollToIndex(20);
  };

  return (
    <>
      <VirtualList
        ref={ref}
        className='List'
        getItemHeight={() => 50}
        dataSource={DataSource}
        renderItem={(item, index) => {
          return <div></div>;
        }}
      />
    </>
  );
}
```
