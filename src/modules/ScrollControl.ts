import { ScrollFromOffsetControl } from '../typings';

export function createsScrollByOffsetHandler(
  list: HTMLDivElement | null
): ScrollFromOffsetControl {
  return (options) => {
    if (!list) return;

    list.scrollBy(options);
  };
}

export function createsScrollToOffsetHandler(
  list: HTMLDivElement | null
): ScrollFromOffsetControl {
  return (options) => {
    if (!list) return;

    list.scrollTo(options);
  };
}
