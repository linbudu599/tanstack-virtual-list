import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  InstantiatedVirtualizerOptions,
  VirtualListProps,
  VirtualListRef,
} from './typings';
import { normalizeInputProps } from './modules/InputNormalizer';

import FixedListImpl from './components/FixedList';
import DynamicListImpl from './components/DynamicList';

const VirtualList = forwardRef<VirtualListRef, VirtualListProps>(
  (props, ref) => {
    const normalizedProps = normalizeInputProps(props);

    const listRef = useRef<HTMLDivElement>(null);

    const {
      dynamic,
      dataSource,
      renderItem,
      getItemHeight,
      getItemKey,
      buffer,
      padding,
      scrollPadding,
      horizontal,
      initialOffset,
      style,
      useVirtualizerOptions,
      ...htmlProps
    } = normalizedProps;

    const [paddingStart, paddingEnd] = padding.map((item) =>
      parseInt(String(item), 10)
    );

    const [scrollPaddingStart] = scrollPadding.map((item) =>
      parseInt(String(item), 10)
    );

    const scrollToFn: InstantiatedVirtualizerOptions['scrollToFn'] = (
      offset,
      canSmooth
    ) => {};

    const virtualizer = useVirtualizer({
      count: dataSource.length,
      getScrollElement: () => listRef.current,
      estimateSize: (index) => getItemHeight(dataSource[index], index),
      overscan: buffer,
      horizontal,
      paddingStart,
      paddingEnd,
      scrollPaddingStart,
      scrollToFn,
      ...useVirtualizerOptions,
    });

    function scrollByOffset() {}

    function scrollToOffset() {}

    function scrollToIndex() {}

    function resetScroll() {}

    useImperativeHandle(ref, () => {
      return {
        list: listRef.current,
        virtualizer,
        scrollByOffset,
        scrollToOffset,
        scrollToIndex,
        resetScroll,
      };
    });

    const VirtualListImpl = dynamic ? FixedListImpl : DynamicListImpl;

    return (
      <>
        <VirtualListImpl
          ref={listRef}
          virtualizer={virtualizer}
          {...normalizedProps}
        />
      </>
    );
  }
);

export default VirtualList;
