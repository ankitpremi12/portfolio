"use client";

import { useEffect } from "react";
import { intel } from "@/lib/store";

export default function Expertise() {
  useEffect(() => {
    // Add interactions for the bento cards
    const cards = document.querySelectorAll('.bento-card');
    const onEnter = () => {
      document.body.classList.add('hovering');
      intel.interaction = Math.min(1, intel.interaction + .25);
    };
    const onLeave = () => document.body.classList.remove('hovering');

    cards.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cards.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <section className="section" id="expertise">
      <div className="wrap bento-wrap">
        <div className="skills-header">
          <div>
            <div className="s-marker reveal"><span className="s-marker-num">02</span>Capabilities</div>
            <h2 className="skills-heading reveal">Core<br/>Expertise</h2>
          </div>
          <div className="skills-meta reveal d2">Architecting autonomous AI workflows for Fortune 500s</div>
        </div>

        <div className="bento-grid">
          <div className="bento-card b-large reveal d1">
            <div className="bc-num">01 // Agentic AI &amp; LLMs</div>
            <div className="bc-title">Designing autonomous systems that reason and execute.</div>
            <div className="bc-icon">✧</div>
            <div className="bc-chips mt-auto">
              <span className="bc-chip">LangChain / LlamaIndex</span>
              <span className="bc-chip">GPT-4 / Claude / Llama 3</span>
              <span className="bc-chip">Multi-Agent Systems</span>
              <span className="bc-chip">Function Calling / RAG</span>
            </div>
          </div>

          <div className="bento-card b-wide reveal d2">
            <div className="bc-num">02 // Machine Learning &amp; Deep Learning</div>
            <div className="bc-title">Predictive modeling at production scale.</div>
            <div className="bc-icon">✦</div>
            <div className="bc-chips mt-auto">
              <span className="bc-chip">XGBoost / Random Forest</span>
              <span className="bc-chip">PyTorch / TensorFlow</span>
              <span className="bc-chip">NLP / Computer Vision</span>
            </div>
          </div>

          <div className="bento-card b-tall reveal d3">
            <div className="bc-num">03 // MLOps &amp; Cloud</div>
            <div className="bc-title">Shipping models to the real world.</div>
            <div className="bc-icon">◎</div>
            <div className="bc-chips mt-auto" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <span className="bc-chip">Docker / CI/CD</span>
              <span className="bc-chip">AWS Lambda / S3 / EC2</span>
              <span className="bc-chip">FastAPI / Flask</span>
            </div>
          </div>

          <div className="bento-card b-norm reveal d1">
            <div className="bc-num">04 // Data Engineering</div>
            <div className="bc-title">Building data infrastructure.</div>
            <div className="bc-icon">◈</div>
            <div className="bc-chips mt-auto">
              <span className="bc-chip">SQL / PostgreSQL</span>
              <span className="bc-chip">Vector DBs (Pinecone)</span>
              <span className="bc-chip">Spark / Hadoop</span>
            </div>
          </div>

          <div className="bento-card b-norm reveal d2">
            <div className="bc-num">05 // Foundation</div>
            <div className="bc-title">Core engineering.</div>
            <div className="bc-icon">◉</div>
            <div className="bc-chips mt-auto">
              <span className="bc-chip">Python</span>
              <span className="bc-chip">C++</span>
              <span className="bc-chip">React / Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
