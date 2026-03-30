"use client";

import { useEffect, useRef } from "react";
import { setCOn } from "@/lib/engine";

export default function Consulting() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          setCOn(x.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    io.observe(rootRef.current);

    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="consulting" ref={rootRef}>
      <div className="wrap">
        <div className="s-marker reveal"><span className="s-marker-num">06</span>Strategy</div>
        <div className="consult-layout">
          <div>
            <h2 className="consult-heading reveal">Strategic<br/><em>AI Advisory</em></h2>
            <div className="consult-sub reveal d1">Beyond writing code, I partner with organizations to identify high-ROI AI opportunities, design scalable ML architectures, and build data strategies that avoid technical debt.</div>
            <div className="consult-pillars reveal d2">
              <div className="consult-pillar"><div className="cp-dot"></div><span>Problem Framing &amp; ROI Analysis</span></div>
              <div className="consult-pillar"><div className="cp-dot"></div><span>Data Strategy &amp; Pipeline Architecture</span></div>
              <div className="consult-pillar"><div className="cp-dot"></div><span>Technology Stack Selection</span></div>
              <div className="consult-pillar"><div className="cp-dot"></div><span>Agentic AI &amp; LLM Orchestration</span></div>
              <div className="consult-pillar"><div className="cp-dot"></div><span>MLOps &amp; Infrastructure Automation</span></div>
              <div className="consult-pillar"><div className="cp-dot"></div><span>Team Mentorship &amp; Alignment</span></div>
            </div>
          </div>
          <div className="consult-canvas-wrap reveal d2">
            <canvas id="consult-canvas"></canvas>
            <div className="consult-center-label">System<br/>Core</div>
          </div>
        </div>
      </div>
    </section>
  );
}
