import { useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line unused-imports/no-unused-vars
export function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null }) as any
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep)
}
