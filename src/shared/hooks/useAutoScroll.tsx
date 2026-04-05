import { useEffect, useRef } from 'react';

export function useAutoScroll<T>(dep: T) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [dep]);

  return containerRef;
}
