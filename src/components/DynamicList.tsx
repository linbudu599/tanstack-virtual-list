import React, { forwardRef } from 'react';

import { VirtualListImplProps } from '../typings';
import { omitNonHTMLProps } from '../modules/InputNormalizer';
import {
  createAbsolutePositionStyle,
  createVirtualSizeListContentStyle,
  createDirectionBasedListContainerStyle,
  createDynamicListItemStyle,
  createRelativePositionStyle,
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
            className={classNameBuilder('list-item')}
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
      className={classNameBuilder('list-container', className)}
      style={{
        height: 400,
        width: 400,
        overflowY: 'auto',
      }}
    >
      {PaddingStartPlaceholder}
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
        className={classNameBuilder('list')}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualizerItems[0]?.start ?? 0}px)`,
          }}
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
      className={classNameBuilder('list-container', className)}
      style={{
        ...createDirectionBasedListContainerStyle(horizontal),
        ...style,
      }}
    >
      {PaddingStartPlaceholder}
      <div
        style={{
          ...createRelativePositionStyle(),
          ...createVirtualSizeListContentStyle(
            virtualizer.getTotalSize(),
            true
          ),
        }}
        className={classNameBuilder('list')}
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
