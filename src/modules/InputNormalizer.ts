import {
  NormalizedVirtualListPadding,
  NormalizedVirtualListProps,
  VirtualListImplProps,
  VirtualListPadding,
  VirtualListProps,
} from '../typings';

export function normalizeInputPadding(
  input: VirtualListPadding
): NormalizedVirtualListPadding {
  if (Array.isArray(input)) {
    const [start = 0, end = 0] = input;
    return [start, end];
  }

  return [input, input];
}

export function normalizeInputProps(
  input?: VirtualListProps
): NormalizedVirtualListProps {
  const {
    getItemHeight,
    dataSource = [],
    renderItem,

    getItemKey = (_item, index) => index.toString(),

    dynamic = false,
    horizontal = false,
    buffer = 0,
    padding = 0,
    scrollPadding = 0,

    initialOffset = 0,

    useVirtualizerOptions = {},

    prefixClassName = 'tanstack-virtual',

    ...restProps
  } = (input ?? {}) as VirtualListProps;

  return {
    dataSource,
    renderItem,
    getItemHeight,
    getItemKey,
    dynamic,
    horizontal,
    buffer,
    padding: normalizeInputPadding(padding),
    scrollPadding: normalizeInputPadding(scrollPadding),
    initialOffset,
    useVirtualizerOptions,
    prefixClassName,
    ...restProps,
  };
}

export function pickHTMLSpecifiedProps(
  input: VirtualListImplProps
): React.HTMLAttributes<HTMLDivElement> {
  const {
    dataSource,
    renderItem,
    getItemHeight,
    getItemKey,
    dynamic,
    horizontal,
    buffer,
    padding,
    scrollPadding,
    initialOffset,
    useVirtualizerOptions,
    virtualizer,
    prefixClassName,
    ...restProps
  } = input;

  return restProps;
}
