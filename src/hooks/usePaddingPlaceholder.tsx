import React, { useMemo } from 'react';
import { NormalizedVirtualListPadding } from '../typings';

export const usePaddingPlaceholder = (
  padding: NormalizedVirtualListPadding,
  horizontal = false
) => {
  const [PaddingStartPlaceholder, PaddingEndPlaceholder] = useMemo(() => {
    const [paddingStart, paddingEnd] = padding;
    const [paddingStartInt, paddingEndInt] = [paddingStart, paddingEnd].map(
      (item) => parseInt(item.toString(), 10)
    );

    const gapProvider = horizontal ? 'width' : 'height';

    return [
      paddingStartInt > 0 ? (
        <div
          style={{
            [gapProvider]: paddingStartInt,
          }}
        />
      ) : null,
      paddingEndInt > 0 ? (
        <div
          style={{
            [gapProvider]: paddingEndInt,
          }}
        />
      ) : null,
    ];
  }, [padding, horizontal]);

  return [PaddingStartPlaceholder, PaddingEndPlaceholder] as const;
};
