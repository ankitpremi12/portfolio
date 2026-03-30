export const PROJECTS = [
  {
    id: 'p1', num: '01', title: 'Agentic AI Analytics Assistant', year: 'Jan–Feb 2026',
    tags: ['LangChain', 'RAG', 'Vector DBs', 'AWS SageMaker'],
    desc: 'Autonomous AI agent for Business Intelligence — dynamic task planning, tool invocation, hybrid retrieval achieving 95% accuracy.',
    bullets: [
      'Designed autonomous AI agent for BI with dynamic task planning and tool invocation',
      'Integrated hybrid RAG (vector + structured retrieval) achieving 95% accuracy',
      'Implemented tool-calling framework for DB queries, statistical analysis, summaries',
      'Deployed scalable inference solution on AWS SageMaker'
    ],
    tech: 'LangChain · RAG · Vector DBs · AWS SageMaker · Python · LlamaIndex · Pinecone',
    glowColor: '#e8c56a'
  },
  {
    id: 'p2', num: '02', title: 'Predictive Customer Analytics Platform', year: 'Aug–Nov 2025',
    tags: ['XGBoost', 'FastAPI', 'Docker', 'AWS Lambda'],
    desc: 'Churn prediction at 87% accuracy with RAG-based explainability — 1000+ req/day at sub-200ms latency in production.',
    bullets: [
      'Developed churn prediction model (87% accuracy, 0.82 AUC-ROC) with 30+ behavioral features',
      'Integrated RAG-based explainability layer for natural language insights',
      'Implemented real-time API serving 1000+ req/day with <200ms latency',
      'Orchestrated production deployment using Docker, AWS Lambda, and S3'
    ],
    tech: 'XGBoost · FastAPI · Docker · AWS Lambda · S3 · Python · Scikit-learn · PostgreSQL',
    glowColor: '#4d8fff'
  },
  {
    id: 'p3', num: '03', title: 'Disease Spread Simulation', year: 'Mar–Jun 2025',
    tags: ['Graph Algorithms', 'NumPy', 'Python', 'BFS/DFS'],
    desc: 'Epidemic propagation on 10K+ node networks with 82% real-world alignment and 70% runtime acceleration via vectorization.',
    bullets: [
      'Simulated epidemics on 10K+ node networks (82% alignment with real-world outbreak data)',
      'Implemented BFS, DFS, Dijkstra with O(V+E) optimization',
      'Accelerated runtime by 70% using NumPy vectorization',
      'Visualized spread dynamics with interactive network analysis'
    ],
    tech: 'Python · NumPy · NetworkX · Graph Algorithms · D3.js · Matplotlib · SciPy',
    glowColor: '#e8c56a'
  }
];

export const FLOWS: Record<string, string> = {
  p1: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet"><defs><filter id="mf-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path class="mf-path" id="mfp1-a" d="M 120 100 L 230 100"/><path class="mf-path" id="mfp1-b" d="M 380 100 L 490 100"/><path class="mf-path" id="mfp1-c" d="M 640 100 L 750 100"/><g class="mf-node"><rect x="10" y="65" width="110" height="70" rx="12"/><text x="65" y="97">User Query</text><text class="mf-sub" x="65" y="116">BI / Analytics</text></g><g class="mf-node"><rect x="230" y="65" width="150" height="70" rx="12"/><text x="305" y="97">Agent Brain</text><text class="mf-sub" x="305" y="116">LangChain / GPT-4</text></g><g class="mf-node"><rect x="490" y="65" width="150" height="70" rx="12"/><text x="565" y="97">Hybrid RAG</text><text class="mf-sub" x="565" y="116">Vector + Structured</text></g><g class="mf-node mf-output"><rect x="750" y="65" width="140" height="70" rx="12"/><text x="820" y="97">Output</text><text class="mf-sub" x="820" y="116">SageMaker · 95%</text></g></svg>`,
  p2: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet"><defs><filter id="mf-glow2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path class="mf-path" id="mfp2-a" d="M 110 100 L 210 100"/><path class="mf-path" id="mfp2-b" d="M 360 100 L 460 100"/><path class="mf-path" id="mfp2-c" d="M 610 100 L 710 100"/><g class="mf-node"><rect x="10" y="65" width="100" height="70" rx="12"/><text x="60" y="97">Customer</text><text class="mf-sub" x="60" y="116">30+ Features</text></g><g class="mf-node"><rect x="210" y="65" width="150" height="70" rx="12"/><text x="285" y="97">XGBoost</text><text class="mf-sub" x="285" y="116">87% Accuracy</text></g><g class="mf-node"><rect x="460" y="65" width="150" height="70" rx="12"/><text x="535" y="97">RAG Explainer</text><text class="mf-sub" x="535" y="116">NL Insights</text></g><g class="mf-node mf-output"><rect x="710" y="65" width="180" height="70" rx="12"/><text x="800" y="97">FastAPI · Docker</text><text class="mf-sub" x="800" y="116">&lt;200ms · 1000+ req/day</text></g></svg>`,
  p3: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet"><defs><filter id="mf-glow3"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path class="mf-path" id="mfp3-a" d="M 120 100 L 230 100"/><path class="mf-path" id="mfp3-b" d="M 390 100 L 500 100"/><path class="mf-path" id="mfp3-c" d="M 660 100 L 750 100"/><g class="mf-node"><rect x="10" y="65" width="110" height="70" rx="12"/><text x="65" y="97">Network Graph</text><text class="mf-sub" x="65" y="116">10K+ Nodes</text></g><g class="mf-node"><rect x="230" y="65" width="160" height="70" rx="12"/><text x="310" y="97">BFS/DFS/Dijkstra</text><text class="mf-sub" x="310" y="116">O(V+E) Optimized</text></g><g class="mf-node"><rect x="500" y="65" width="160" height="70" rx="12"/><text x="580" y="97">NumPy Engine</text><text class="mf-sub" x="580" y="116">70% Speedup</text></g><g class="mf-node mf-output"><rect x="750" y="65" width="140" height="70" rx="12"/><text x="820" y="97">Visualization</text><text class="mf-sub" x="820" y="116">82% Alignment</text></g></svg>`
};
