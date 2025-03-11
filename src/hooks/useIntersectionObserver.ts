import { useEffect } from "react";

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
  dependencies: any[],
  isFetching?: boolean
) => {
  useEffect(() => {
    if (!ref.current || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, dependencies);
};
