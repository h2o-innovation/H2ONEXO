"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: ReactNode;
  delay?: string;
  className?: string;
};

export function SectionReveal({ children, delay = "delay-0", className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-900 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        delay,
        isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}