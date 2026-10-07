"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { DEMO_VIDEO } from "@/lib/content";

export function VideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    ref.current?.play();
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink p-1.5 shadow-float">
      <div className="relative aspect-video overflow-hidden rounded-[1.4rem] bg-ink">
        <video
          ref={ref}
          src={DEMO_VIDEO}
          preload="metadata"
          playsInline
          controls={playing}
          className="h-full w-full object-cover"
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={play}
            aria-label="Lire la démo vidéo"
            className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
          >
            <span className="relative grid size-24 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full bg-brand/40"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative grid size-20 place-items-center rounded-full bg-brand text-ink shadow-glow transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-1 size-7 fill-current" />
              </span>
            </span>
            <span className="absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
              <span className="size-1.5 rounded-full bg-brand" /> Voir la démo
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
