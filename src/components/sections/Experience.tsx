"use client";

export default function Experience() {
  return (
    <>
      <section id="experience" className="section">
        <div className="wrap">
          <div className="exp-grid">
            <div style={{ position: 'sticky', top: 160, alignSelf: 'start' }}>
              <div className="s-marker reveal"><span className="s-marker-num">04</span>Career</div>
              <h2 className="exp-left-head reveal">Professional<br/>Timeline</h2>
            </div>
            <div className="tl">
              <div className="tl-item">
                <div className="tl-spine"></div>
                <div>
                  <div className="tl-period">Sep – Oct 2025</div>
                  <div className="tl-role">Data Analyst Intern</div>
                  <div className="tl-company">VOIS · Vodafone Intelligent Solutions · Remote</div>
                  <div className="tl-desc">
                    <ul style={{ marginLeft: 16, marginBottom: 12, listStyleType: 'none' }}>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Automated enterprise reporting with RAG + LLMs, reducing manual work by 75%
                      </li>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Architected API-driven data pipeline with real-time LLM summarization
                      </li>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Launched Slack-integrated analytics system serving 50+ stakeholders daily
                      </li>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Operationalized scalable inference workflows on AWS Lambda and S3
                      </li>
                      <li style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Achieved 92% stakeholder satisfaction via context-aware AI reports
                      </li>
                    </ul>
                  </div>
                  <div className="tl-chips">
                    <span className="tl-chip">Python</span><span className="tl-chip">GPT-4</span>
                    <span className="tl-chip">LangChain</span><span className="tl-chip">RAG</span>
                    <span className="tl-chip">AWS Lambda</span><span className="tl-chip">REST APIs</span>
                  </div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-spine"></div>
                <div>
                  <div className="tl-period">Jul – Aug 2025</div>
                  <div className="tl-role">Research &amp; Development Intern</div>
                  <div className="tl-company">C-DOT · Centre for Development of Telematics · New Delhi</div>
                  <div className="tl-desc">
                    <ul style={{ marginLeft: 16, marginBottom: 12, listStyleType: 'none' }}>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Developed phishing detection ML system (89% precision, 86% recall) benchmarked on 1,00,000+ live URLs
                      </li>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Engineered 45+ features: regex patterns, TLD signals, URLNet embeddings, semantic vectors
                      </li>
                      <li style={{ position: 'relative', paddingBottom: 6 }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Optimized RF+XGBoost ensemble improving F1-score by 12%
                      </li>
                      <li style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: -16, color: 'var(--gold)' }}>▹</span>
                        Productionized automated ML pipeline for preprocessing, training, evaluation
                      </li>
                    </ul>
                    <div style={{ marginTop: 16, marginBottom: 4 }}>
                      <a 
                        href="https://phishguard-classifier-1rk0o7vyh-ankitpremi12s-projects.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 10,
                          color: 'var(--gold)',
                          fontFamily: 'var(--f-mono)',
                          fontSize: '9px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          padding: '8px 16px',
                          border: '1px solid rgba(201, 168, 76, 0.25)',
                          background: 'rgba(201, 168, 76, 0.05)',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'none'
                        }}
                        className="tl-project-btn"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(201, 168, 76, 0.12)';
                          e.currentTarget.style.borderColor = 'var(--gold)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(201, 168, 76, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.25)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)' }}></span>
                        View Project ↗
                      </a>
                    </div>
                  </div>
                  <div className="tl-chips">
                    <span className="tl-chip">Python</span><span className="tl-chip">XGBoost</span><span className="tl-chip">Scikit-learn</span><span className="tl-chip">Feature Engineering</span><span className="tl-chip">MLOps</span>
                  </div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-spine"></div>
                <div>
                  <div className="tl-period">2022 – 2026</div>
                  <div className="tl-role">B.Tech — AI &amp; Data Science</div>
                  <div className="tl-company">MAIT · Maharaja Agrasen Institute of Technology · Delhi</div>
                  <div className="tl-desc">Comprehensive curriculum: Machine Learning, Deep Learning, NLP, Computer Vision, MLOps, Cloud Computing, DSA. Active in competitive programming and applied research projects.</div>
                  <div className="tl-chips">
                    <span className="tl-chip">ML</span><span className="tl-chip">Deep Learning</span><span className="tl-chip">NLP</span><span className="tl-chip">Computer Vision</span><span className="tl-chip">Cloud</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="credentials">
        <div className="wrap">
          <div className="s-marker reveal"><span className="s-marker-num">05</span>Verifications</div>
          <div className="cred-grid">
            <div>
              <h3 className="cred-heading reveal">Global Certifications &amp; Achievements</h3>
              <div className="cred-list reveal d1">
                <div className="cred-item">
                  <div className="cred-provider">DeepLearning.AI</div>
                  <div className="cred-name">Supervised Machine Learning: Regression and Classification</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Google Cloud Skills Boost</div>
                  <div className="cred-name">Explore Generative AI with Vertex AI Gemini API</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Google Cloud Skills Boost</div>
                  <div className="cred-name">Enhance Gemini Model Capabilities</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Google Cloud Skills Boost</div>
                  <div className="cred-name">Create ML Models with BigQuery ML</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Google Cloud Skills Boost</div>
                  <div className="cred-name">Perform Predictive Data Analysis in BigQuery</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Google Cloud Skills Boost</div>
                  <div className="cred-name">Build Infrastructure with Terraform on Google Cloud</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Deloitte</div>
                  <div className="cred-name">Deloitte Data Analytics</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Accenture</div>
                  <div className="cred-name">Accenture Consultant Job Simulation</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Indian Institute of Management Ahmedabad</div>
                  <div className="cred-name">Associate in Management (IIM)</div>
                </div>
                <div className="cred-item">
                  <div className="cred-provider">Indian Institute of Technology Delhi</div>
                  <div className="cred-name">National Space Hackathon (IIT Delhi)</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="cred-heading reveal">Core Strengths</h3>
              <div className="strength-grid reveal d2">
                <div className="strength-pill">System Architecture</div>
                <div className="strength-pill">Algorithmic Trading</div>
                <div className="strength-pill">Low-Latency Inference</div>
                <div className="strength-pill">Team Leadership</div>
                <div className="strength-pill">Agile Delivery</div>
                <div className="strength-pill">Distributed Training</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
