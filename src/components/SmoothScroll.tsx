"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9, anchors: { offset: -88, duration: 1.4 } }}>
      {children}
    </ReactLenis>
  );
}
