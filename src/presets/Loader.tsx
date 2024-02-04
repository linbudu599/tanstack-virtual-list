import React, { useRef, useEffect, useState } from 'react';

export interface LoaderProps extends React.PropsWithChildren {
  onAppear?: () => void;
  onDisappear?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onAppear, onDisappear, children }) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      setIsVisible(isVisible);
    });

    observerRef.current ? observer.observe(observerRef.current) : void 0;

    return () => {
      observerRef.current ? observer.unobserve(observerRef.current) : void 0;
    };
  }, []);

  useEffect(() => {
    isVisible ? onAppear?.() : onDisappear?.();
  }, [isVisible]);

  return (
    <div
      ref={observerRef}
      style={{
        height: 0,
        width: 0,
      }}
    />
  );
};

export default Loader;
