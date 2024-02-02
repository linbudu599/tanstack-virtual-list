import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useSpring } from '@react-spring/web';

import { normalizeInputProps } from './modules/InputNormalizer';

import FixedListImpl from './components/FixedList';
import DynamicListImpl from './components/DynamicList';

import {
  createsScrollByOffsetHandler,
  createsScrollToOffsetHandler,
} from './modules/ScrollControl';

import type {
  InstantiatedVirtualizerOptions,
  VirtualListComponentTyping,
  VirtualListProps,
  VirtualListRef,
} from './typings';

export type { VirtualListRef } from './typings';

const VirtualList = forwardRef<VirtualListRef, VirtualListProps>(
  (props, ref) => {
    const normalizedProps = normalizeInputProps(props);

    const listRef = useRef<HTMLDivElement>(null);

    const {
      dynamic,
      dataSource,
      getItemHeight,
      buffer,
      padding,
      scrollPadding,
      horizontal,
      useVirtualizerOptions,
      initialOffset,
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
      // scrollPaddingStart,
      // scrollToFn,
      // initialOffset,
      ...useVirtualizerOptions,
      indexAttribute: 'data-virtual-item-index',
    });

    useImperativeHandle(ref, () => {
      return {
        list: listRef.current,
        virtualizer,
        scrollByOffset: virtualizer.scrollBy,
        scrollToOffset: virtualizer.scrollToOffset,
        scrollToIndex: virtualizer.scrollToIndex,
      };
    });

    const VirtualListImpl = dynamic ? DynamicListImpl : FixedListImpl;

    return (
      <VirtualListImpl
        ref={listRef}
        virtualizer={virtualizer}
        {...normalizedProps}
      />
    );
  }
);

export default VirtualList as VirtualListComponentTyping;
