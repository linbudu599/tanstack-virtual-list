import clsx from 'clsx';

export function createClassNameBuilder(prefix: string) {
  return (
    fragment: string,
    ...rest: (string | undefined | null | boolean)[]
  ) => {
    const composed = `${prefix}-${fragment}`;

    return rest?.length > 0 ? clsx(composed, ...rest) : composed;
  };
}
