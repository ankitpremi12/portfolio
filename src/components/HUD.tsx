"use client";

import { useEffect, useState } from "react";
import { intel } from "@/lib/store";

export default function HUD() {
  const [energy, setEnergy] = useState("0");
  const [focus, setFocus] = useState("0");
  const [phase, setPhase] = useState("INIT");
  const [ebar, setEbar] = useState("0%");

  useEffect(() => {
    // Poll the global intel store
    const interval = setInterval(() => {
      const e = Math.round(intel.energy * 100).toString();
      const f = Math.round(intel.focus * 100).toString();
      if (energy !== e) setEnergy(e);
      if (focus !== f) setFocus(f);
      if (phase !== intel.phase) setPhase(intel.phase.toUpperCase());
    }, 100);
    return () => clearInterval(interval);
  }, [energy, focus, phase]);

  return (
    <div id="intel-hud">
      <div className="hud-r">
        <div className="hud-l">Energy</div>
        <div className="hud-b"><div id="hud-e" className="hud-f" style={{ width: `${energy}%` }}></div></div>
        <div id="hud-ev" className="hud-v">{energy}</div>
      </div>
      <div className="hud-r">
        <div className="hud-l">Focus</div>
        <div className="hud-b"><div id="hud-f" className="hud-f" style={{ width: `${focus}%` }}></div></div>
        <div id="hud-fv" className="hud-v">{focus}</div>
      </div>
      <div className="hud-r">
        <div className="hud-l">State</div>
        <div id="hud-ph" className="hud-v" style={{ width: "auto" }}>{phase}</div>
      </div>
    </div>
  );
}
