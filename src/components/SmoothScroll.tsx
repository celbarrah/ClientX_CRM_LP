"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.13, smoothWheel: true, wheelMultiplier: 1, anchors: { offset: -88, duration: 1 } }}>
      {children}
    </ReactLenis>
  );
}
