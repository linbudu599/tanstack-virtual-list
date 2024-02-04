import React, { forwardRef } from 'react';

import { VirtualListImplProps } from '../typings';
import { omitNonHTMLProps } from '../modules/InputNormalizer';
import {
  createListContentStyle,
  createDirectionBasedListContainerStyle,
  createDynamicListItemStyle,
  createListContainerStyle,
  createVerticalDynamicListStyle,
} from '../modules/StylePresets';
import { usePaddingPlaceholder } from '../hooks/usePaddingPlaceholder';
import { createClassNameBuilder } from '../modules/ClassNameBuilder';

const DynamicItemsRenderer: React.FC<VirtualListImplProps> = (props) => {
  const {
    horizontal,
    dataSource,
    renderItem,
    getItemKey,
    virtualizer,
    prefixClassName,
  } = props;

  const classNameBuilder = createClassNameBuilder(prefixClassName);

  return (
    <>
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const { index } = virtualItem;

        const itemRenderSource = dataSource[index];

        return (
          <div
            key={getItemKey(itemRenderSource, index)}
            data-virtual-item-index={index}
            ref={virtualizer.measureElement}
            style={createDynamicListItemStyle(virtualItem, horizontal)}
            className={classNameBuilder('list-item')}
          >
            {renderItem(itemRenderSource, index, virtualItem)}
          </div>
        );
      })}
    </>
  );
};

const VerticalDynamicVirtualList = forwardRef<
  HTMLDivElement,
  VirtualListImplProps
>((props, ref) => {
  const { virtualizer, padding, prefixClassName } = props;
  const htmlProps = omitNonHTMLProps(props);

  const virtualizerItems = virtualizer.getVirtualItems();

  const classNameBuilder = createClassNameBuilder(prefixClassName);

  const [PaddingStartPlaceholder, PaddingEndPlaceholder] =
    usePaddingPlaceholder(padding, false);

  return (
    <div
      {...htmlProps}
      ref={ref}
      className={classNameBuilder('list-container', htmlProps.className)}
    >
      {PaddingStartPlaceholder}
      <div
        style={{
          ...createListContainerStyle(),
          ...createDirectionBasedListContainerStyle(
            virtualizer.getTotalSize(),
            false
          ),
        }}
        className={classNameBuilder('list')}
      >
        <div
          style={{
            ...createListContentStyle(),
            ...createVerticalDynamicListStyle(
              virtualizerItems?.[0]?.start ?? 0
            ),
          }}
        >
          <DynamicItemsRenderer {...props} />
        </div>
      </div>
      {PaddingEndPlaceholder}
    </div>
  );
});

const HorizontalDynamicVirtualList = forwardRef<
  HTMLDivElement,
  VirtualListImplProps
>((props, ref) => {
  const { virtualizer, padding, prefixClassName } = props;
  const htmlProps = omitNonHTMLProps(props);
  const classNameBuilder = createClassNameBuilder(prefixClassName);

  const [PaddingStartPlaceholder, PaddingEndPlaceholder] =
    usePaddingPlaceholder(padding, false);

  return (
    <div
      {...htmlProps}
      ref={ref}
      className={classNameBuilder('list-container', htmlProps.className)}
    >
      {PaddingStartPlaceholder}
      <div
        style={{
          ...createListContainerStyle(),
          ...createDirectionBasedListContainerStyle(
            virtualizer.getTotalSize(),
            true
          ),
        }}
        className={classNameBuilder('list')}
      >
        <DynamicItemsRenderer {...props} />
      </div>
      {PaddingEndPlaceholder}
    </div>
  );
});

const DynamicListImpl = forwardRef<HTMLDivElement, VirtualListImplProps>(
  (props, ref) => {
    const { horizontal } = props;

    const DynamicListImpl = horizontal
      ? HorizontalDynamicVirtualList
      : VerticalDynamicVirtualList;

    return <DynamicListImpl {...props} ref={ref} />;
  }
);

export default DynamicListImpl;
