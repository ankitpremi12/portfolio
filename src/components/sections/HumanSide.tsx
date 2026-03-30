"use client";

import { useEffect } from "react";
import { intel } from "@/lib/store";

const NeuralNode = ({ x, y, c }: { x: number, y: number, c: string }) => (
  <circle cx={x} cy={y} r="2.5" fill={c} style={{ filter: `drop-shadow(0 0 3px ${c})` }} />
);
const NeuralEdge = ({ d, stroke }: { d: string, stroke: string }) => (
  <path d={d} fill="none" stroke={stroke} strokeWidth="1" />
);

const TennisNeuron = () => {
  const c = "#ff4d4d"; const s = "rgba(255, 77, 77, 0.45)";
  const edges = [
    "M50,15 L35,28 L28,45 L38,60 L50,65 L62,60 L72,45 L65,28 Z",
    "M50,15 L50,35 M35,28 L50,35 L65,28 M28,45 L40,45 L50,35 M60,45 L50,35 M72,45 L60,45 M38,60 L45,52 L50,35 M62,60 L55,52 L50,35",
    "M45,64 L45,85 L55,85 L55,64 M45,75 L55,75",
    "M40,45 L45,52 L55,52 L60,45 L50,45 Z"
  ];
  return (
    <svg viewBox="0 0 100 100" className="hc-neuron-svg" style={{ width: 44, height: 44, marginBottom: 24, overflow: 'visible' }}>
      {edges.map((e, i) => <NeuralEdge key={i} d={e} stroke={s} />)}
      <NeuralNode x={50} y={15} c={c} />
      <NeuralNode x={35} y={28} c={c} />
      <NeuralNode x={65} y={28} c={c} />
      <NeuralNode x={28} y={45} c={c} />
      <NeuralNode x={40} y={45} c={c} />
      <NeuralNode x={50} y={45} c={c} />
      <NeuralNode x={60} y={45} c={c} />
      <NeuralNode x={72} y={45} c={c} />
      <NeuralNode x={45} y={52} c={c} />
      <NeuralNode x={55} y={52} c={c} />
      <NeuralNode x={38} y={60} c={c} />
      <NeuralNode x={62} y={60} c={c} />
      <NeuralNode x={50} y={65} c={c} />
      <NeuralNode x={45} y={75} c={c} />
      <NeuralNode x={55} y={75} c={c} />
      <NeuralNode x={45} y={85} c={c} />
      <NeuralNode x={55} y={85} c={c} />
      <NeuralNode x={50} y={35} c={c} />
    </svg>
  );
};

const PawNeuron = () => {
  const c = "#f5a623"; const s = "rgba(245, 166, 35, 0.45)";
  const edges = [
    // Main pad
    "M35,60 L50,55 L65,60 L60,75 L50,80 L40,75 Z",
    "M35,60 L50,68 L65,60 M40,75 L50,68 L60,75",
    // Toes Base
    "M25,35 L32,30 L22,45 Z M42,20 L50,15 L45,25 Z M58,20 L50,15 L55,25 Z M75,35 L68,30 L78,45 Z",
    // Interconnections
    "M32,30 L42,20 M58,20 L68,30 M35,60 L32,30 M65,60 L68,30 M50,55 L45,25 M50,55 L55,25 L50,68",
    "M22,45 L35,60 M78,45 L65,60"
  ];
  return (
    <svg viewBox="0 0 100 100" className="hc-neuron-svg" style={{ width: 44, height: 44, marginBottom: 24, overflow: 'visible' }}>
      {edges.map((e, i) => <NeuralEdge key={i} d={e} stroke={s} />)}
      {[
        [35,60],[50,55],[65,60],[60,75],[50,80],[40,75],[50,68], // pad
        [25,35],[32,30],[22,45], // T1
        [42,20],[50,15],[45,25], // T2
        [58,20],[55,25], // T3 (shared 50,15)
        [75,35],[68,30],[78,45]  // T4
      ].map((pt, i) => <NeuralNode key={i} x={pt[0]} y={pt[1]} c={c} />)}
    </svg>
  );
};

const LeafNeuron = () => {
  const c = "#4caf50"; const s = "rgba(76, 175, 80, 0.45)";
  const edges = [
    // Center spine
    "M50,90 L50,70 L50,45 L50,20 L50,5",
    // Left side
    "M50,90 L35,65 L20,45 L35,25 L50,5",
    // Right side
    "M50,90 L65,65 L80,45 L65,25 L50,5",
    // Inner veins
    "M50,70 L35,65 M50,70 L65,65 M50,45 L20,45 M50,45 L80,45 M50,20 L35,25 M50,20 L65,25",
    "M35,65 L30,45 L35,25 M65,65 L70,45 L65,25",
    "M50,45 L30,45 M50,45 L70,45"
  ];
  return (
    <svg viewBox="0 0 100 100" className="hc-neuron-svg" style={{ width: 44, height: 44, marginBottom: 24, overflow: 'visible' }}>
      {edges.map((e, i) => <NeuralEdge key={i} d={e} stroke={s} />)}
      {[
        [50,90],[50,70],[50,45],[50,20],[50,5], // spine
        [35,65],[20,45],[35,25], // left
        [65,65],[80,45],[65,25], // right
        [30,45],[70,45] // inner lattice
      ].map((pt, i) => <NeuralNode key={i} x={pt[0]} y={pt[1]} c={c} />)}
    </svg>
  );
};

export default function HumanSide() {
  useEffect(() => {
    const cards = document.querySelectorAll('.human-card');
    
    const binds: { el: Element, enter: () => void, leave: () => void }[] = [];

    cards.forEach(el => {
      const onEnter = () => {
        document.body.classList.add('hovering');
        intel.humanZone = el.id.replace('hc-', '');
        intel.interaction = 1;

        // Apply a slight pulse to the nodes internally on hover
        const svg = el.querySelector('.hc-neuron-svg');
        if(svg) svg.classList.add('pulse');
      };
      const onLeave = () => {
        document.body.classList.remove('hovering');
        intel.humanZone = null;

        const svg = el.querySelector('.hc-neuron-svg');
        if(svg) svg.classList.remove('pulse');
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      
      binds.push({ el, enter: onEnter, leave: onLeave });
    });

    return () => {
      binds.forEach(b => {
        b.el.removeEventListener('mouseenter', b.enter);
        b.el.removeEventListener('mouseleave', b.leave);
      });
    };
  }, []);

  return (
    <section className="section" id="human">
      <div className="wrap">
        <div className="s-marker reveal"><span className="s-marker-num">07</span>Human Side</div>
        <h2 className="human-heading reveal">Beyond models<br/><em>and metrics</em></h2>
        <div className="human-sub reveal d1">
          Systems perform best when they emulate organic intelligence. Outside of the terminal, I train my own neural networks through fast-twitch reflexes, empathy, and environmental observation.
        </div>
        
        <div className="human-grid">
          <div className="human-card reveal" id="hc-pingpong">
            <TennisNeuron />
            <div className="hc-title">Table Tennis</div>
            <div className="hc-desc">Micro-second decision making, pattern recognition, and flow-state execution. A physical manifestation of high-frequency feedback loops.</div>
          </div>
          
          <div className="human-card reveal" id="hc-pets">
            <PawNeuron />
            <div className="hc-title">Animal Empathy</div>
            <div className="hc-desc">Understanding non-verbal communication and behavioral patterns. Teaching patience, adaptability, and emotional calibration.</div>
          </div>

          <div className="human-card reveal" id="hc-nature">
            <LeafNeuron />
            <div className="hc-title">Wildlife &amp; Nature</div>
            <div className="hc-desc">Observing self-sustaining systems and complex ecosystems. Finding elegant, minimalist solutions inspired by natural evolution.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
