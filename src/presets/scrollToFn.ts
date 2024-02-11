import { InstantiatedVirtualizerOptions } from '../typings';

type TimingFunction = (x: number) => number;

type TimingFunctionPresets =
  | 'easeOutSine'
  | 'linear'
  | 'easeInOutQuint'
  | 'easeOutQuint'
  | 'easeOutQuart'
  | 'easeOutCubic'
  | 'easeOutQuad'
  | 'easeOutExpo'
  | 'easeOutCirc';

const timingFunctions: Record<TimingFunctionPresets, TimingFunction> = {
  easeOutSine(x: number) {
    return Math.sin((x * Math.PI) / 2);
  },
  linear(x: number) {
    return x;
  },
  easeInOutQuint(x: number) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x;
  },
  easeOutQuint(x: number) {
    return 1 + --x * x * x * x * x;
  },
  easeOutQuart(x: number) {
    return 1 - --x * x * x * x;
  },
  easeOutCubic(x: number) {
    return 1 + --x * x * x;
  },
  easeOutQuad(x: number) {
    return 1 - --x * x;
  },
  easeOutExpo(x: number) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  easeOutCirc(x: number) {
    return Math.sqrt(1 - --x * x);
  },
};

export const scrollToFn: InstantiatedVirtualizerOptions['scrollToFn'] = (
  offset,
  canSmooth
) => {};
