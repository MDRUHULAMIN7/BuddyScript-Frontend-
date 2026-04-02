"use client";

import { useEffect, useRef } from "react";

type InfiniteScrollSentinelProps = {
  canLoadMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export function InfiniteScrollSentinel({
  canLoadMore,
  isLoading,
  onLoadMore,
}: InfiniteScrollSentinelProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || !canLoadMore || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [canLoadMore, isLoading, onLoadMore]);

  return <div ref={ref} style={{ height: 1 }} aria-hidden="true" />;
}
