import React, { forwardRef } from 'react';

import { omitNonHTMLProps } from '../modules/InputNormalizer';
import { usePaddingPlaceholder } from '../hooks/usePaddingPlaceholder';
import { createClassNameBuilder } from '../modules/ClassNameBuilder';
import {
  createVirtualSizeListContentStyle,
  createDirectionBasedListContainerStyle,
  createDynamicListItemStyle,
  createRelativePositionStyle,
  createVertialDynamicListContentTransformStyle,
} from '../modules/StylePresets';

import type { VirtualListImplProps } from '../typings';

const DynamicItemsRenderer: React.FC<VirtualListImplProps> = (props) => {
  const {
    horizontal,
    dataSource,
    renderItem,
    getItemKey,
    virtualizer,
    prefixClassName,
    renderItemContainer: ItemContainer,
  } = props;

  const classNameBuilder = createClassNameBuilder(prefixClassName);

  return (
    <>
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const { index } = virtualItem;

        const itemRenderSource = dataSource[index];

        return (
          <ItemContainer
            key={getItemKey(itemRenderSource, index)}
            data-virtual-item-index={index}
            ref={virtualizer.measureElement}
            style={createDynamicListItemStyle(virtualItem, horizontal)}
            className={classNameBuilder('item')}
          >
            {renderItem(itemRenderSource, index, virtualItem)}
          </ItemContainer>
        );
      })}
    </>
  );
};

const VerticalDynamicVirtualList = forwardRef<
  HTMLDivElement,
  VirtualListImplProps
>((props, ref) => {
  const {
    virtualizer,
    padding,
    prefixClassName,
    horizontal,
    className,
    style,
    renderListContainer: ListContainer,
  } = props;

  const htmlProps = omitNonHTMLProps(props);

  const virtualizerItems = virtualizer.getVirtualItems();

  const classNameBuilder = createClassNameBuilder(prefixClassName);

  const [PaddingStartPlaceholder, PaddingEndPlaceholder] =
    usePaddingPlaceholder(padding, false);

  return (
    <ListContainer
      {...htmlProps}
      ref={ref}
      className={classNameBuilder('container', className)}
      style={{
        ...createDirectionBasedListContainerStyle(horizontal),
        ...style,
      }}
    >
      {PaddingStartPlaceholder}
      <div
        className={classNameBuilder('content')}
        style={{
          ...createRelativePositionStyle(),
          ...createVirtualSizeListContentStyle(
            virtualizer.getTotalSize(),
            false
          ),
        }}
      >
        <div
          className={classNameBuilder('content-transform')}
          style={createVertialDynamicListContentTransformStyle(
            virtualizerItems
          )}
        >
          <DynamicItemsRenderer {...props} />
        </div>
      </div>
      {PaddingEndPlaceholder}
    </ListContainer>
  );
});

const HorizontalDynamicVirtualList = forwardRef<
  HTMLDivElement,
  VirtualListImplProps
>((props, ref) => {
  const {
    virtualizer,
    padding,
    prefixClassName,
    horizontal,
    style,
    className,
    renderListContainer: ListContainer,
  } = props;

  const htmlProps = omitNonHTMLProps(props);
  const classNameBuilder = createClassNameBuilder(prefixClassName);

  const [PaddingStartPlaceholder, PaddingEndPlaceholder] =
    usePaddingPlaceholder(padding, false);

  return (
    <ListContainer
      {...htmlProps}
      ref={ref}
      className={classNameBuilder('container', className)}
      style={{
        ...createDirectionBasedListContainerStyle(horizontal),
        ...style,
      }}
    >
      {PaddingStartPlaceholder}
      <div
        className={classNameBuilder('content')}
        style={{
          ...createRelativePositionStyle(),
          ...createVirtualSizeListContentStyle(
            virtualizer.getTotalSize(),
            true
          ),
        }}
      >
        <DynamicItemsRenderer {...props} />
      </div>
      {PaddingEndPlaceholder}
    </ListContainer>
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
