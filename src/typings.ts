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

export type ScrollFromOffsetControl = (options?: ScrollControlOptions) => void;

type VirtualListRefExpose = {
  list: HTMLDivElement | null;
  virtualizer: V;
  scrollByOffset: V['scrollBy'];
  scrollToOffset: V['scrollToOffset'];
  scrollToIndex: V['scrollToIndex'];
};

export type VirtualListRef = VirtualListRefExpose | null | undefined;

interface VirtualListRendererProps<TDataSource = any> {
  dataSource: TDataSource[];
  renderItem: VirtualItemRenderer<TDataSource>;
}

interface VirtualListItemDescriptor<TDataSource = any> {
  getItemHeight: (item: TDataSource, index: number) => number;
  getItemKey?: (item: TDataSource, index: number) => React.Key;
}

export type VirtualListPadding = number | [start?: number, end?: number];

export type NormalizedVirtualListPadding = Required<
  Exclude<VirtualListPadding, number>
>;

export interface VirtualListPaddingProps {
  padding?: VirtualListPadding;
  scrollPadding?: VirtualListPadding;
}

type RenderContainer = React.ElementType;

export interface VirtualListRenderContainerProps {
  renderListContainer?: RenderContainer;
  renderItemContainer?: RenderContainer;
}

export interface NormalizedVirtualListPaddingProps {
  padding: NormalizedVirtualListPadding;
  scrollPadding: NormalizedVirtualListPadding;
}

export interface VirtualListCoreProps<TDataSource = any> {
  dynamic?: boolean;
  initialOffset?: number;
  horizontal?: boolean;
  overscan?: number;
  useVirtualizerOptions?: Partial<InstantiatedVirtualizerOptions>;
}

export interface VirtualListEventProps {}

export interface VirtualListStyleMutationProps {
  prefixClassName?: string;
}

export interface VirtualListProps<TDataSource = any>
  extends VirtualListCoreProps<TDataSource>,
    VirtualListRendererProps<TDataSource>,
    VirtualListItemDescriptor<TDataSource>,
    VirtualListPaddingProps,
    VirtualListEventProps,
    VirtualListStyleMutationProps,
    VirtualListRenderContainerProps,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

export interface NormalizedVirtualListProps<TDataSource = any>
  extends Required<VirtualListCoreProps<TDataSource>>,
    VirtualListRendererProps<TDataSource>,
    Required<VirtualListItemDescriptor<TDataSource>>,
    NormalizedVirtualListPaddingProps,
    VirtualListEventProps,
    Required<VirtualListStyleMutationProps>,
    Required<VirtualListRenderContainerProps>,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

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
