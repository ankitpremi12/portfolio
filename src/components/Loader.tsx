"use client";

import { useEffect, useState } from "react";
import { initMaster, initEntity, initExp, initNeurons, initConsult } from "@/lib/engine";

export default function Loader() {
  const [phase, setPhase] = useState("Initializing");
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const phases = ['Initializing', 'Loading intelligence', 'Calibrating systems', 'Ready'];
    let currentCount = 0;
    
    // Simulate initial delayed load up
    setTimeout(() => {
      document.getElementById("lw1")?.classList.add("up");
    }, 120);
    setTimeout(() => {
      document.getElementById("lw2")?.classList.add("up");
      const f = document.getElementById("loader-fill");
      if (f) f.style.width = "100%";
    }, 220);

    const tick = setInterval(() => {
      currentCount = Math.min(currentCount + Math.floor(Math.random() * 13) + 5, 100);
      setCount(currentCount);
      setPhase(phases[Math.floor((currentCount / 100) * (phases.length - 1))]);

      if (currentCount >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setUnmount(true);
            
            // Re-initialize canvases explicitly AFTER loader drops to ensure DOM is ready and properly layered.
            const mc = document.getElementById('master-canvas') as HTMLCanvasElement;
            if (mc) initMaster(mc);
            const ec = document.getElementById('entity-canvas') as HTMLCanvasElement;
            if (ec) initEntity(ec);
            const xp = document.getElementById('exp-canvas') as HTMLCanvasElement;
            if (xp) initExp(xp);
            const nc = document.getElementById('neuron-canvas') as HTMLCanvasElement;
            if (nc) initNeurons(nc);
            const cc = document.getElementById('consult-canvas') as HTMLCanvasElement;
            if (cc) initConsult(cc);

          }, 800);
        }, 350);
      }
    }, 32);

    return () => clearInterval(tick);
  }, []);

  if (unmount) return null;

  return (
    <div id="loader" style={done ? { opacity: 0, transition: 'opacity .8s' } : {}}>
      <div className="loader-line"><span id="lw1" className="loader-word">Ankit Premi</span></div>
      <div className="loader-line"><span id="lw2" className="loader-word">System Online</span></div>
      <div id="loader-status">
        <div id="loader-pct">{String(count).padStart(3, '0')}</div>
        <div id="loader-track"><div id="loader-fill"></div></div>
        <div id="loader-phase">{phase.toUpperCase()}</div>
      </div>
    </div>
  );
}
