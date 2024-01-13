import React, { forwardRef } from 'react';
import {
  VirtualListImplProps,
  VirtualListProps,
  VirtualListRef,
} from '../typings';
import { pickHTMLSpecifiedProps } from '../modules/InputNormalizer';
import {
  createAbsolutePositionStyle,
  createDirectionBasedFixedListItemStyle,
  createDirectionBasedListContainerStyle,
  createListContainerStyle,
} from '../modules/StylePresets';

const DynamicListImpl = forwardRef<HTMLDivElement, VirtualListImplProps>(
  (props, ref) => {
    const { dataSource, renderItem, getItemKey, virtualizer, horizontal } =
      props;
    const htmlProps = pickHTMLSpecifiedProps(props);

    const virtualizerItems = virtualizer.getVirtualItems();

    return (
      <div
        ref={ref}
        style={{
          ...createListContainerStyle(),
          ...createDirectionBasedListContainerStyle(
            virtualizer.getTotalSize(),
            horizontal
          ),
        }}
        {...htmlProps}
      >
        {virtualizerItems.map((virtualItem) => {
          const { index } = virtualItem;

          const itemRenderSource = dataSource[index];

          return (
            <div
              key={getItemKey(itemRenderSource, index)}
              data-virtual-item-index={index}
              style={{
                ...createAbsolutePositionStyle(),
                ...createDirectionBasedFixedListItemStyle(
                  virtualItem,
                  horizontal
                ),
              }}
            >
              {renderItem(itemRenderSource, index, virtualItem)}
            </div>
          );
        })}
      </div>
    );
  }
);

export default DynamicListImpl;
