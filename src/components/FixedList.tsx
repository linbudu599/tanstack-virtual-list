import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { omitNonHTMLProps } from '../modules/InputNormalizer';
import {
  createAbsolutePositionStyle,
  createVirtualSizeListContentStyle,
  createDirectionBasedFixedListItemStyle,
  createDirectionBasedListContainerStyle,
  createRelativePositionStyle,
} from '../modules/StylePresets';

import type { VirtualListImplProps } from '../typings';
import { createClassNameBuilder } from '../modules/ClassNameBuilder';

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
    } = props;

    const htmlProps = omitNonHTMLProps(props);
    const virtualizerItems = virtualizer.getVirtualItems();
    const classNameBuilder = createClassNameBuilder(prefixClassName);

    return (
      <div
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
                className={classNameBuilder('list-item')}
              >
                {renderItem(itemRenderSource, index, virtualItem)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default FixedListImpl;
