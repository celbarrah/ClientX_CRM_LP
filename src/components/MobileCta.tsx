"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CTA } from "@/lib/content";
import { Button } from "@/components/ui";

/** Sticky bottom CTA on mobile, shown once the hero form has scrolled out of view. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("demo");
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed inset-x-3 bottom-3 z-50 md:hidden"
        >
          <Button href="#demo" size="lg" className="w-full justify-between shadow-float">
            {CTA.primary}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
