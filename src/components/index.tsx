import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { elementScroll, useVirtualizer } from '@tanstack/react-virtual';

import FixedListImpl from './FixedList';
import DynamicListImpl from './DynamicList';

import { normalizeInputProps } from '../modules/InputNormalizer';
import { VirtualizerIndexAttribute } from '../modules/Constants';

import type {
  InstantiatedVirtualizerOptions,
  VirtualListComponentTyping,
  VirtualListProps,
  VirtualListRef,
} from '../typings';

const VirtualList = forwardRef<VirtualListRef, VirtualListProps>(
  (props, ref) => {
    const normalizedProps = normalizeInputProps(props);

    const listRef = useRef<HTMLDivElement>(null);

    const {
      dynamic,
      dataSource,
      getItemHeight,
      overscan,
      padding,
      scrollPadding,
      horizontal,
      useVirtualizerOptions,
      initialOffset,
    } = normalizedProps;

    const [paddingStart, paddingEnd] = padding.map((item) =>
      parseInt(String(item), 10)
    );

    const [scrollPaddingStart, scrollPaddingEnd] = scrollPadding.map((item) =>
      parseInt(String(item), 10)
    );

    const scrollToFn: InstantiatedVirtualizerOptions['scrollToFn'] = (
      offset,
      options,
      virtualizer
    ) => {
      elementScroll(offset, options, virtualizer);
    };

    const virtualizer = useVirtualizer({
      count: dataSource.length,
      getScrollElement: () => listRef.current,
      estimateSize: (index) => getItemHeight(dataSource[index], index),
      overscan,
      horizontal,
      paddingStart,
      paddingEnd,
      scrollPaddingStart,
      scrollPaddingEnd,
      initialOffset,
      scrollToFn,
      ...useVirtualizerOptions,
      indexAttribute: VirtualizerIndexAttribute,
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
