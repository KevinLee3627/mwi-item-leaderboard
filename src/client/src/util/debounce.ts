export function debounce<T extends (...args: any[]) => unknown>(
  fn: T,
  ms: number
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
