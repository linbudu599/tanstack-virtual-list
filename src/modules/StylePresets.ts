import React from 'react';

import { VirtualItem } from '@tanstack/react-virtual';

export function createDirectionBasedListContainerStyle(
  horizontal = false
): React.CSSProperties {
  return horizontal
    ? {
        overflowX: 'auto',
      }
    : {
        overflowY: 'auto',
      };
}

export function createRelativePositionStyle(): React.CSSProperties {
  return {
    position: 'relative',
  };
}

export function createVirtualSizeListContentStyle(
  virtualSize: number,
  horizontal = false
): React.CSSProperties {
  return {
    height: horizontal ? '100%' : virtualSize,
    width: horizontal ? virtualSize : '100%',
  };
}

export function createAbsolutePositionStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
  };
}

export function createDirectionBasedFixedListItemStyle(
  item: VirtualItem,
  horizontal = false
): React.CSSProperties {
  const transform = horizontal
    ? `translateX(${item.start}px)`
    : `translateY(${item.start}px)`;

  const rect = horizontal
    ? {
        width: `${item.size}px`,
        height: '100%',
      }
    : {
        width: '100%',
        height: `${item.size}px`,
      };

  return {
    transform,
    ...rect,
  };
}

export function createDynamicListItemStyle(
  item: VirtualItem,
  horizontal = false
): React.CSSProperties {
  return horizontal
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        transform: `translateX(${item.start}px)`,
      }
    : {};
}
