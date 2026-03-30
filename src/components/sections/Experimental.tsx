"use client";

import { useEffect } from "react";
import { setXOn } from "@/lib/engine";

export default function Experimental() {
  useEffect(() => {
    const el = document.getElementById("experimental");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          setXOn(x.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="experimental" className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div id="exp-wrap">
        <canvas id="exp-canvas"></canvas>
        <div className="exp-ghost">
          <div className="exp-ghost-t">Think</div>
        </div>
        <canvas id="neuron-canvas"></canvas>
        <div className="exp-hint">Neural propagation mapping</div>
        <div id="exp-ebar" className="exp-ebar"></div>
      </div>
    </div>
  );
}
