import React, { forwardRef } from 'react';

import { omitNonHTMLProps } from '../modules/InputNormalizer';
import { createClassNameBuilder } from '../modules/ClassNameBuilder';
import {
  createAbsolutePositionStyle,
  createVirtualSizeListContentStyle,
  createDirectionBasedFixedListItemStyle,
  createDirectionBasedListContainerStyle,
  createRelativePositionStyle,
} from '../modules/StylePresets';

import type { VirtualListImplProps } from '../typings';

const FixedListImpl = forwardRef<HTMLDivElement, VirtualListImplProps>(
  (props, ref) => {
    const {
      dataSource,
      renderItem,
      getItemKey,
      virtualizer,
      horizontal,
      prefixClassName,
      className,
      style,
      renderListContainer: ListContainer,
      renderItemContainer: ItemContainer,
    } = props;

    const htmlProps = omitNonHTMLProps(props);
    const virtualizerItems = virtualizer.getVirtualItems();
    const classNameBuilder = createClassNameBuilder(prefixClassName);

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
        <div
          style={{
            ...createRelativePositionStyle(),
            ...createVirtualSizeListContentStyle(
              virtualizer.getTotalSize(),
              horizontal
            ),
          }}
          className={classNameBuilder('list')}
        >
          {virtualizerItems.map((virtualItem) => {
            const { index } = virtualItem;

            const itemRenderSource = dataSource[index];

            return (
              <ItemContainer
                key={getItemKey(itemRenderSource, index)}
                data-virtual-item-index={index}
                style={{
                  ...createAbsolutePositionStyle(),
                  ...createDirectionBasedFixedListItemStyle(
                    virtualItem,
                    horizontal
                  ),
                }}
                className={classNameBuilder('list-item')}
              >
                {renderItem(itemRenderSource, index, virtualItem)}
              </ItemContainer>
            );
          })}
        </div>
      </ListContainer>
    );
  }
);

export default FixedListImpl;
