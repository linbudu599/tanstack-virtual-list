import React from 'react';

import type {
  Virtualizer,
  VirtualItem,
  VirtualizerOptions,
} from '@tanstack/react-virtual';

export type {
  Virtualizer,
  VirtualItem,
  VirtualizerOptions,
  ScrollToOptions,
} from '@tanstack/react-virtual';

export type VirtualItemRenderer<TDataSource = any> = (
  item: TDataSource,
  index: number,
  virtualItem: VirtualItem
) => React.ReactNode;

export type InstantiatedVirtualizerOptions = VirtualizerOptions<
  HTMLDivElement,
  Element
>;

export type V = Virtualizer<HTMLDivElement, Element>;

export interface ScrollControlOptions extends ScrollToOptions {}

type VirtualListRefExpose = {
  list: HTMLDivElement | null;
  virtualizer: V;
  scrollByOffset: (offset: number, options?: ScrollControlOptions) => void;
  scrollToOffset: (offset: number, options?: ScrollControlOptions) => void;
  scrollToIndex: (index: number, options?: ScrollControlOptions) => void;
  resetScroll: () => void;
};

export type VirtualListRef = VirtualListRefExpose | null | undefined;

interface VirtualListRendererProps<TDataSource = any> {
  dataSource: TDataSource[];
  renderItem: VirtualItemRenderer<TDataSource>;
}

interface VirtualListItemDescriptor<TDataSource = any> {
  getItemHeight: (item: TDataSource, index: number) => number;
  getItemKey: (item: TDataSource, index: number) => React.Key;
}

export type VirtualListPadding = number | [start?: number, end?: number];

export type NormalizedVirtualListPadding = Required<
  Exclude<VirtualListPadding, number>
>;

export interface VirtualListPaddingProps {
  padding?: VirtualListPadding;
  scrollPadding?: VirtualListPadding;
}

export interface NormalizedVirtualListPaddingProps {
  padding: NormalizedVirtualListPadding;
  scrollPadding: NormalizedVirtualListPadding;
}

export interface VirtualListCoreProps<TDataSource = any> {
  initialOffset?: number;
  horizontal?: boolean;
  dynamic?: boolean;
  buffer?: number;
  useVirtualizerOptions: Partial<InstantiatedVirtualizerOptions>;
}

export interface VirtualListEventProps {}

export interface VirtualListProps<TDataSource = any>
  extends VirtualListCoreProps<TDataSource>,
    VirtualListRendererProps<TDataSource>,
    VirtualListItemDescriptor<TDataSource>,
    VirtualListPaddingProps,
    VirtualListEventProps,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement>,
    React.RefAttributes<VirtualListRef> {}

export interface NormalizedVirtualListProps<TDataSource = any>
  extends Required<VirtualListCoreProps<TDataSource>>,
    VirtualListRendererProps<TDataSource>,
    Required<VirtualListItemDescriptor<TDataSource>>,
    NormalizedVirtualListPaddingProps,
    VirtualListEventProps,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement>,
    React.RefAttributes<VirtualListRef> {}

export interface VirtualListImplProps extends NormalizedVirtualListProps {
  virtualizer: V;
}

export interface VirtualListComponentTyping {
  displayName: string;
  <TDataSource = any>(
    props: VirtualListProps<TDataSource> & {
      ref?: React.Ref<VirtualListRef>;
    }
  ): React.ReactElement;
}