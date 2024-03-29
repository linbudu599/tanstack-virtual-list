import type { Exact } from 'type-fest';
import type {
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
    overscan = 0,
    padding = 0,
    scrollPadding = 0,

    initialOffset = 0,

    useVirtualizerOptions = {},

    prefixClassName = 'tanstack-virtual-list',

    renderListContainer = 'div',
    renderItemContainer = 'div',

    className = '',
    style = {},

    ...restProps
  } = (input ?? {}) as VirtualListProps;

  return {
    dataSource,
    renderItem,
    getItemHeight,
    getItemKey,
    dynamic,
    horizontal,
    overscan,
    padding: normalizeInputPadding(padding),
    scrollPadding: normalizeInputPadding(scrollPadding),
    initialOffset,
    useVirtualizerOptions,
    prefixClassName,
    className,
    style,
    renderListContainer,
    renderItemContainer,
    ...restProps,
  };
}

export function omitNonHTMLProps(
  input: VirtualListImplProps
): React.HTMLAttributes<HTMLDivElement> {
  const {
    dataSource,
    renderItem,
    getItemHeight,
    getItemKey,
    dynamic,
    horizontal,
    overscan,
    padding,
    scrollPadding,
    initialOffset,
    useVirtualizerOptions,
    virtualizer,
    prefixClassName,
    renderItemContainer,
    renderListContainer,
    ...restProps
  } = input;

  const _ExhaustiveCheck: Exact<
    React.HTMLAttributes<HTMLDivElement>,
    typeof restProps
  > = restProps;

  return restProps;
}
