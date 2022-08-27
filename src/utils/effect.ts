import type { DependencyList} from 'react';
import { useEffect } from 'react'


export function useAsyncEffect(
  effect: () => Promise<any>,
  deps?: DependencyList,
) {
  useEffect(() => {
    effect()
  }, deps)
}


