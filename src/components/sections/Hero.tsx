"use client";

export default function Hero() {
  return (
    <section id="hero" className="section">
      <canvas id="master-canvas"></canvas>
      <div className="wrap hero-inner">
        <div className="hero-status">
          <div className="hero-status-dot"></div>
          <span>System Online · Intelligence initialized</span>
        </div>
        <h1 className="hero-name">
          <span className="hero-name-line"><span className="hero-name-word">Ankit</span></span>
          <span className="hero-name-line"><span className="hero-name-word">Premi</span></span>
        </h1>
        <div className="hero-foot">
          <div className="hero-role"><strong>Specializing in GenAI, Agentic AI &amp; MLOps</strong><br/>Vodafone Intelligent Solutions · C-DOT · MAIT Delhi · 2026</div>
          <div className="hero-inf">
            <div className="hero-inf-sym">✧</div>
          </div>
          <div className="hero-cta">Scroll to begin <div className="hero-line"></div></div>
        </div>
      </div>
    </section>
  );
}
