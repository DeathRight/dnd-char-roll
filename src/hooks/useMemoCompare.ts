import { useEffect, useRef } from 'react';

const useMemoCompare = (
  next: any,
  compare: (prev: any, next: any) => boolean
) => {
  const prevRef = useRef();
  const prev = prevRef.current;

  const isEqual = compare(prev, next);

  useEffect(() => {
    if (!isEqual) {
      prevRef.current = next;
    }
  });

  return isEqual ? prev : next;
};

export default useMemoCompare;
