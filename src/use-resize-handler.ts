import { useEffect, useRef } from 'react';

export interface ResizeDetector {}

export function useResizeDetector(
  listener: () => void,
  options: ResizeDetector,
) {
  const savedListener = useRef<() => void>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const resizeHandler = savedListener.current;
    const resizeObserver = new ResizeObserver(resizeHandler);
  }, []);

  // useEffect(() => {
  //   const handleResize = savedListener.current;

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
}
