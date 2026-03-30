"use client";

export default function About() {
  return (
    <section id="about" className="section bg">
      <div className="wrap about-grid">
        <div>
          <div className="s-marker reveal"><span className="s-marker-num">01</span>Identity</div>
          <h2 className="about-heading reveal">Engineering <em>Intelligence.</em></h2>
          <div className="about-body reveal d1">
            <p>I build autonomous systems that bridge the gap between raw data and human decision-making. My work focuses on replacing brittle pipelines with adaptable, self-correcting agentic AI.</p>
            <p>From RAG-powered analytics at Vodafone to phishing detection ML at C-DOT benchmarked on 100,000+ live URLs — delivering production ML solutions for Fortune 500 and Government clients.</p>
          </div>
          <div className="about-metrics reveal d2">
            <div className="metric">
              <div className="metric-val counter" data-val="15">0</div>
              <div className="metric-label">Neural Architectures</div>
            </div>
            <div className="metric">
              <div className="metric-val counter" data-val="98">0<sup>%</sup></div>
              <div className="metric-label">System Reliability</div>
            </div>
          </div>
        </div>
        <div className="about-right reveal d3">
          <canvas id="entity-canvas"></canvas>
          <div className="entity-footer">
            <span className="entity-label">Core Engine</span>
            <span className="entity-phase" id="entity-ph">LEARNING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
