/* ═══ DATA ═══════════════════════════════════════════════════ */
const PROJECTS=[{id:'p1',num:'01',title:'Agentic AI Analytics Assistant',year:'Jan–Feb 2026',tags:['LangChain','RAG','Vector DBs','AWS SageMaker'],desc:'Autonomous AI agent for Business Intelligence — dynamic task planning, tool invocation, hybrid retrieval achieving 95% accuracy.',bullets:['Designed autonomous AI agent for BI with dynamic task planning and tool invocation','Integrated hybrid RAG (vector + structured retrieval) achieving 95% accuracy','Implemented tool-calling framework for DB queries, statistical analysis, summaries','Deployed scalable inference solution on AWS SageMaker'],tech:'LangChain · RAG · Vector DBs · AWS SageMaker · Python · LlamaIndex · Pinecone'},{id:'p2',num:'02',title:'Predictive Customer Analytics Platform',year:'Aug–Nov 2025',tags:['XGBoost','FastAPI','Docker','AWS Lambda'],desc:'Churn prediction at 87% accuracy with RAG-based explainability — 1000+ req/day at sub-200ms latency in production.',bullets:['Developed churn prediction model (87% accuracy, 0.82 AUC-ROC) with 30+ behavioral features','Integrated RAG-based explainability layer for natural language insights','Implemented real-time API serving 1000+ req/day with <200ms latency','Orchestrated production deployment using Docker, AWS Lambda, and S3'],tech:'XGBoost · FastAPI · Docker · AWS Lambda · S3 · Python · Scikit-learn · PostgreSQL'},{id:'p3',num:'03',title:'Disease Spread Simulation',year:'Mar–Jun 2025',tags:['Graph Algorithms','NumPy','Python','BFS/DFS'],desc:'Epidemic propagation on 10K+ node networks with 82% real-world alignment and 70% runtime acceleration via vectorization.',bullets:['Simulated epidemics on 10K+ node networks (82% alignment with real-world outbreak data)','Implemented BFS, DFS, Dijkstra with O(V+E) optimization','Accelerated runtime by 70% using NumPy vectorization','Visualized spread dynamics with interactive network analysis'],tech:'Python · NumPy · NetworkX · Graph Algorithms · D3.js · Matplotlib · SciPy'}];



/* ═══ GLOBAL INTELLIGENCE STATE ════════════════════════════ */
const intel={energy:0,focus:0,interaction:0,phase:'init',mode:'analytical',humanZone:null,omT:0,t:0,mx:0.5,my:0.5,pmx:0,pmy:0};
function updateIntel(){
  const sf=window.scrollY/(document.body.scrollHeight-window.innerHeight||1);
  intel.energy=Math.min(1,sf*1.3);
  const vx=intel.mx-intel.pmx,vy=intel.my-intel.pmy;
  const spd=Math.sqrt(vx*vx+vy*vy)*120;
  intel.focus=Math.min(1,intel.focus*0.93+spd*0.07);
  intel.pmx=intel.mx;intel.pmy=intel.my;
  intel.interaction=Math.max(0,intel.interaction*0.985);
  if(sf<0.15)intel.phase='init';
  else if(sf<0.38)intel.phase='learning';
  else if(sf<0.6)intel.phase='evolving';
  else intel.phase='evolved';
  
  const humSec = document.getElementById('human');
  if(humSec) {
    const rect = humSec.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.65 && rect.bottom > window.innerHeight*0.2) {
      intel.mode = 'organic';
    } else {
      intel.mode = 'analytical';
      intel.humanZone = null;
    }
  }
  intel.omT += ((intel.mode === 'organic' ? 1 : 0) - intel.omT) * 0.03;
  const ep=Math.round(intel.energy*100),fp=Math.round(intel.focus*100);
  document.getElementById('hud-e').style.width=ep+'%';
  document.getElementById('hud-f').style.width=fp+'%';
  document.getElementById('hud-ev').textContent=ep;
  document.getElementById('hud-fv').textContent=fp;
  document.getElementById('hud-ph').textContent=intel.phase.toUpperCase();
  document.getElementById('nav-ph').textContent='Intelligence · '+intel.phase;
  const ep2=document.getElementById('entity-ph');if(ep2)ep2.textContent=intel.phase.toUpperCase();
  const eb=document.getElementById('exp-ebar');if(eb)eb.style.width=(intel.energy*100)+'%';
  intel.t+=0.01;
}

/* ═══ MASTER CANVAS ════════════════════════════════════════ */
let mCtx,mW,mH,mParts=[];
function initMaster(){
  const c=document.getElementById('master-canvas');
  mCtx=c.getContext('2d');
  const resize=()=>{mW=c.width=window.innerWidth;mH=c.height=window.innerHeight;};
  resize();window.addEventListener('resize',resize);
  const n=Math.min(Math.floor(mW*mH/14000),90);
  mParts=Array.from({length:n},()=>({x:Math.random()*mW,y:Math.random()*mH,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.1+.3,a:Math.random()*.2+.04,ph:Math.random()*Math.PI*2}));
}
function updateMaster(){
  mCtx.clearRect(0,0,mW,mH);
  const e=intel.energy,f=intel.focus,t=intel.t;
  const fric = 0.972 + (intel.omT * 0.02); // less friction when organic
  mParts.forEach(p=>{
    const att=e*(0.0006 - intel.omT*0.0004); // softer attraction when organic
    
    // Physics overrides
    if (intel.humanZone === 'pingpong') {
      const dx=intel.mx*mW-p.x, dy=intel.my*mH-p.y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d < 150) {
        p.vx -= (dx/d)*0.5; p.vy -= (dy/d)*0.5;
      } else {
        p.vx += dx*att*4; p.vy += dy*att*4;
      }
    } else if (intel.humanZone === 'pets') {
      const dx=intel.mx*mW-p.x, dy=intel.my*mH-p.y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<400) {
        p.vx += dx*0.0003; p.vy += dy*0.0003;
      }
    } else if (intel.humanZone === 'nature') {
      const nx=p.x/mW;
      p.vx += Math.sin(nx*8 + t)*0.06;
      p.vy += Math.cos(p.y/mH*8 - t)*0.03;
      p.vx += (intel.mx*mW-p.x)*att*0.2;
      p.vy += (intel.my*mH-p.y)*att*0.2;
    } else {
      p.vx+=(intel.mx*mW-p.x)*att;
      p.vy+=(intel.my*mH-p.y)*att;
      if(intel.phase==='evolved'){p.vx+=Math.sin(t*.5+p.ph)*.015*e;p.vy+=Math.cos(t*.4+p.ph)*.015*e;}
    }

    p.vx*=fric;p.vy*=fric;
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=mW;if(p.x>mW)p.x=0;if(p.y<0)p.y=mH;if(p.y>mH)p.y=0;
    
    const pa=p.a*(1+Math.sin(t*1.1+p.ph)*.28)*(1+e*.45);
    
    // Color Interpolation
    let tr=201,tg=168,tb=76;
    if(intel.phase==='evolved'){tr=77;tg=143;tb=255;}
    else if(intel.phase==='evolving'){tr=140;tg=150;tb=220;}
    const or=232, og=180 + Math.sin(p.ph)*25, ob=120; // warm organic tones
    const cr=Math.round(tr + (or - tr)*intel.omT);
    const cg=Math.round(tg + (og - tg)*intel.omT);
    const cb=Math.round(tb + (ob - tb)*intel.omT);
    
    const clr = `rgba(${cr},${cg},${cb},${pa})`;
    mCtx.beginPath();mCtx.arc(p.x,p.y,p.r + intel.omT*0.5,0,Math.PI*2);mCtx.fillStyle=clr;mCtx.fill();
    p._cr = cr; p._cg = cg; p._cb = cb;
  });
  
  for(let i=0;i<mParts.length;i++){
    for(let j=i+1;j<mParts.length;j++){
      const dx=mParts[i].x-mParts[j].x,dy=mParts[i].y-mParts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy),mx=90+e*70;
      if(d<mx){
        const a=(1-d/mx)*.055*(1+e*.6);
        const pa=mParts[i];
        const lc = `rgba(${pa._cr},${pa._cg},${pa._cb},${a})`;
        mCtx.beginPath();mCtx.moveTo(mParts[i].x,mParts[i].y);
        if(intel.omT > 0.1) {
          const cx=(mParts[i].x+mParts[j].x)/2 + Math.sin(t+i)*15*intel.omT;
          const cy=(mParts[i].y+mParts[j].y)/2 + Math.cos(t+j)*15*intel.omT;
          mCtx.quadraticCurveTo(cx, cy, mParts[j].x, mParts[j].y);
        } else {
          mCtx.lineTo(mParts[j].x,mParts[j].y);
        }
        mCtx.strokeStyle=lc;mCtx.lineWidth=.5;mCtx.stroke();
      }
    }
  }
}

/* ═══ ENTITY CANVAS ════════════════════════════════════════ */
let eCtx,eRW,eRH;
function initEntity(){
  const c=document.getElementById('entity-canvas');if(!c)return;
  eCtx=c.getContext('2d');
  const dpr=window.devicePixelRatio||1;
  eRW=c.offsetWidth;eRH=c.offsetHeight;
  c.width=eRW*dpr;c.height=eRH*dpr;
  eCtx.scale(dpr,dpr);
}
function updateEntity(){
  if(!eCtx)return;
  const W=eRW,H=eRH,cx=W/2,cy=H/2,t=intel.t,e=intel.energy,f=intel.focus;
  eCtx.clearRect(0,0,W,H);
  const morph=Math.sin(t*.5+e*3)*.5+.5;
  const numRings=Math.floor(3+e*6);
  for(let r=0;r<numRings;r++){
    const frac=r/numRings;
    const rad=35+frac*(Math.min(W,H)*.36);
    const pts=Math.floor(5+r*3+e*7);
    const rot=t*(r%2===0?1:-1)*(.004+e*.009)+(r*Math.PI*2/numRings);
    eCtx.beginPath();
    for(let p=0;p<=pts;p++){
      const ang=(p/pts)*Math.PI*2+rot;
      const nA=7+morph*18+e*28+f*12;
      const ns=Math.sin(ang*3+t*1.2+r)*nA+Math.cos(ang*5-t*.8)*nA*.45;
      const rx=cx+(rad+ns)*Math.cos(ang),ry=cy+(rad+ns)*Math.sin(ang);
      p===0?eCtx.moveTo(rx,ry):eCtx.lineTo(rx,ry);
    }
    eCtx.closePath();
    const a=(.055+e*.05)*(1-frac*.35);
    const h=intel.phase==='evolved'?210+frac*40:40+frac*18;
    const s=intel.phase==='evolved'?'65%':'48%';
    eCtx.strokeStyle=`hsla(${h},${s},68%,${a})`;eCtx.lineWidth=1;eCtx.stroke();
  }
  const cR=10+morph*7+e*15;
  const g=eCtx.createRadialGradient(cx,cy,0,cx,cy,cR*2.2);
  g.addColorStop(0,`rgba(201,168,76,${.35+e*.3})`);
  g.addColorStop(.5,`rgba(201,168,76,${.08+e*.08})`);
  g.addColorStop(1,'rgba(201,168,76,0)');
  eCtx.beginPath();eCtx.arc(cx,cy,cR*2.2,0,Math.PI*2);eCtx.fillStyle=g;eCtx.fill();
  const orbN=Math.floor(3+e*9);
  for(let i=0;i<orbN;i++){
    const ang=(i/orbN)*Math.PI*2+t*(.3+e*.4);
    const dst=55+e*75+Math.sin(t*.7+i)*18;
    const ox=cx+dst*Math.cos(ang),oy=cy+dst*Math.sin(ang);
    const or=1.8+morph*2+e*2.5;
    eCtx.beginPath();eCtx.arc(ox,oy,or,0,Math.PI*2);
    eCtx.fillStyle=`rgba(201,168,76,${.28+e*.38})`;eCtx.fill();
    eCtx.beginPath();eCtx.moveTo(cx,cy);eCtx.lineTo(ox,oy);
    eCtx.strokeStyle=`rgba(201,168,76,${.035+e*.055})`;eCtx.lineWidth=.5;eCtx.stroke();
  }
}

/* ═══ EXPERIMENTAL CANVAS ═══════════════════════════════════ */
let xCtx,xW,xH,xParts=[],xOn=false;
function initExp(){
  const c=document.getElementById('exp-canvas');if(!c)return;
  xCtx=c.getContext('2d');
  xW=c.width=c.offsetWidth;xH=c.height=c.offsetHeight;
  const n=Math.min(Math.floor(xW*xH/3200),280);
  xParts=Array.from({length:n},()=>({x:Math.random()*xW,y:Math.random()*xH,vx:0,vy:0,sz:Math.random()*2+.5,hue:Math.random()*40+20,ph:Math.random()*Math.PI*2}));
}
function updateExp(){
  if(!xCtx||!xOn)return;
  const t=intel.t,e=intel.energy,f=intel.focus,mx=intel.mx*xW,my=intel.my*xH;
  xCtx.fillStyle='rgba(3,5,7,0.14)';xCtx.fillRect(0,0,xW,xH);
  xParts.forEach(p=>{
    const nx=p.x/xW,ny=p.y/xH;
    const ang=Math.sin(nx*4+t*.3+p.ph)*Math.PI+Math.cos(ny*3-t*.2)*Math.PI;
    p.vx+=Math.cos(ang)*(.08+e*.25);p.vy+=Math.sin(ang)*(.08+e*.25);
    const dx=mx-p.x,dy=my-p.y,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<220){p.vx+=(dx/dist)*f*1.8*intel.interaction;p.vy+=(dy/dist)*f*1.8*intel.interaction;}
    if(intel.phase==='evolved'){p.vx+=Math.sin(t*1.8+p.ph)*.12*e;p.vy+=Math.cos(t*1.5+p.ph)*.12*e;}
    p.vx*=.91;p.vy*=.91;
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=xW;if(p.x>xW)p.x=0;if(p.y<0)p.y=xH;if(p.y>xH)p.y=0;
    const hs=intel.phase==='evolved'?200+intel.energy*40:p.hue+intel.energy*18;
    const sa=Math.min(1,(Math.abs(p.vx)+Math.abs(p.vy))*.3);
    xCtx.beginPath();xCtx.arc(p.x,p.y,p.sz,0,Math.PI*2);
    xCtx.fillStyle=`hsla(${hs},58%,64%,${.18+sa*.55})`;xCtx.fill();
  });
}

/* ═══ CURSOR ════════════════════════════════════════════════ */
const cDot=document.getElementById('c-dot'),cRing=document.getElementById('c-ring'),cTrail=document.getElementById('c-trail');
let cMx=0,cMy=0,cRx=0,cRy=0,cTx=0,cTy=0;
document.addEventListener('mousemove',e=>{cMx=e.clientX;cMy=e.clientY;intel.mx=e.clientX/window.innerWidth;intel.my=e.clientY/window.innerHeight;});
function updateCursor(){
  cRx+=(cMx-cRx)*.14;cRy+=(cMy-cRy)*.14;
  cTx+=(cMx-cTx)*.06;cTy+=(cMy-cTy)*.06;
  cDot.style.left=cMx+'px';cDot.style.top=cMy+'px';
  cRing.style.left=cRx+'px';cRing.style.top=cRy+'px';
  cTrail.style.left=cTx+'px';cTrail.style.top=cTy+'px';
}
document.querySelectorAll('a,button,.project-row,.metric,.skill-cell,.c-link').forEach(el=>{
  el.addEventListener('mouseenter',()=>{document.body.classList.add('hovering');intel.interaction=Math.min(1,intel.interaction+.2);});
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
});

/* ═══ PROJECTS ══════════════════════════════════════════════ */
function renderProjects(){
  const l=document.getElementById('project-list');if(!l)return;
  l.innerHTML=PROJECTS.map(p=>`<div class="project-row" data-id="${p.id}"><div class="pr-num">${p.num}</div><div class="pr-title">${p.title}</div><div class="pr-desc">${p.desc}</div><div class="pr-tags">${p.tags.map(t=>`<span class="pr-tag">${t}</span>`).join('')}</div><div class="pr-year">${p.year}</div><div class="pr-arrow">↗</div></div>`).join('');
  document.querySelectorAll('.project-row').forEach(el=>{
    el.addEventListener('click',()=>{const p=PROJECTS.find(x=>x.id===el.dataset.id);if(p)openModal(p);intel.interaction=1;});
    el.addEventListener('mouseenter',()=>{intel.interaction=Math.min(1,intel.interaction+.25);});
  });
}
/* ═══ FLOW SVGs ═════════════════════════════════════════════ */
const FLOWS = {
  p1: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
    <defs><filter id="mf-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path class="mf-path" id="mfp1-a" d="M 120 100 L 230 100"/>
    <path class="mf-path" id="mfp1-b" d="M 380 100 L 490 100"/>
    <path class="mf-path" id="mfp1-c" d="M 640 100 L 750 100"/>
    <g class="mf-node"><rect x="10" y="65" width="110" height="70" rx="12"/><text x="65" y="97">User Query</text><text class="mf-sub" x="65" y="116">BI / Analytics</text></g>
    <g class="mf-node"><rect x="230" y="65" width="150" height="70" rx="12"/><text x="305" y="97">Agent Brain</text><text class="mf-sub" x="305" y="116">LangChain / GPT-4</text></g>
    <g class="mf-node"><rect x="490" y="65" width="150" height="70" rx="12"/><text x="565" y="97">Hybrid RAG</text><text class="mf-sub" x="565" y="116">Vector + Structured</text></g>
    <g class="mf-node mf-output"><rect x="750" y="65" width="140" height="70" rx="12"/><text x="820" y="97">Output</text><text class="mf-sub" x="820" y="116">SageMaker · 95%</text></g>
  </svg>`,
  p2: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
    <defs><filter id="mf-glow2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path class="mf-path" id="mfp2-a" d="M 110 100 L 210 100"/>
    <path class="mf-path" id="mfp2-b" d="M 360 100 L 460 100"/>
    <path class="mf-path" id="mfp2-c" d="M 610 100 L 710 100"/>
    <g class="mf-node"><rect x="10" y="65" width="100" height="70" rx="12"/><text x="60" y="97">Customer</text><text class="mf-sub" x="60" y="116">30+ Features</text></g>
    <g class="mf-node"><rect x="210" y="65" width="150" height="70" rx="12"/><text x="285" y="97">XGBoost</text><text class="mf-sub" x="285" y="116">87% Accuracy</text></g>
    <g class="mf-node"><rect x="460" y="65" width="150" height="70" rx="12"/><text x="535" y="97">RAG Explainer</text><text class="mf-sub" x="535" y="116">NL Insights</text></g>
    <g class="mf-node mf-output"><rect x="710" y="65" width="180" height="70" rx="12"/><text x="800" y="97">FastAPI · Docker</text><text class="mf-sub" x="800" y="116">&lt;200ms · 1000+ req/day</text></g>
  </svg>`,
  p3: `<svg class="modal-flow-svg" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
    <defs><filter id="mf-glow3"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path class="mf-path" id="mfp3-a" d="M 120 100 L 230 100"/>
    <path class="mf-path" id="mfp3-b" d="M 390 100 L 500 100"/>
    <path class="mf-path" id="mfp3-c" d="M 660 100 L 750 100"/>
    <g class="mf-node"><rect x="10" y="65" width="110" height="70" rx="12"/><text x="65" y="97">Network Graph</text><text class="mf-sub" x="65" y="116">10K+ Nodes</text></g>
    <g class="mf-node"><rect x="230" y="65" width="160" height="70" rx="12"/><text x="310" y="97">BFS/DFS/Dijkstra</text><text class="mf-sub" x="310" y="116">O(V+E) Optimized</text></g>
    <g class="mf-node"><rect x="500" y="65" width="160" height="70" rx="12"/><text x="580" y="97">NumPy Engine</text><text class="mf-sub" x="580" y="116">70% Speedup</text></g>
    <g class="mf-node mf-output"><rect x="750" y="65" width="140" height="70" rx="12"/><text x="820" y="97">Visualization</text><text class="mf-sub" x="820" y="116">82% Alignment</text></g>
  </svg>`
};

function openModal(p){
  const flowSvg = FLOWS[p.id] || '';
  document.getElementById('modal-body').innerHTML=`
    <div class="modal-eyebrow">${p.num} / 0${PROJECTS.length} · Selected Work</div>
    <h2 class="modal-title">${p.title}</h2>
    <div class="modal-hr"></div>
    <div class="modal-grid">
      <div>
        <div class="modal-sl">Overview</div>
        <p class="modal-text">${p.desc}</p>
        <div class="modal-hr"></div>
        <div class="modal-sl">Key Achievements</div>
        <ul class="modal-list">${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
      </div>
      <div>
        <div class="modal-sl">Timeline</div>
        <p class="modal-text">${p.year}</p>
        <div class="modal-hr"></div>
        <div class="modal-sl">Tech Stack</div>
        <div class="modal-chips">${p.tech.split(' · ').map(t=>`<span class="modal-chip">${t}</span>`).join('')}</div>
      </div>
    </div>
    ${flowSvg ? `<div class="modal-hr"></div><div class="modal-sl">System Architecture</div><div class="modal-flow-wrap">${flowSvg}</div>` : ''}
  `;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
  // Animate the flow dots after the DOM is rendered
  if(flowSvg && typeof MotionPathPlugin !== 'undefined') {
    requestAnimationFrame(() => {
      const modalBody = document.getElementById('modal-body');
      const paths = modalBody.querySelectorAll('.mf-path');
      const svg = modalBody.querySelector('.modal-flow-svg');
      if(!svg || !paths.length) return;
      paths.forEach(path => {
        for(let j = 0; j < 2; j++) {
          const dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
          dot.setAttribute("r","3.5");
          dot.setAttribute("fill","#e8c56a");
          dot.setAttribute("filter","url(#mf-glow)");
          svg.appendChild(dot);
          gsap.to(dot, {
            duration: 2 + Math.random() * 1.5,
            repeat: -1,
            ease: "power1.inOut",
            motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] },
            delay: j * (0.8 + Math.random())
          });
        }
      });
    });
  }
}
document.getElementById('modal-close').addEventListener('click',()=>{document.getElementById('modal').classList.remove('open');document.body.style.overflow='';});

/* ═══ OBSERVERS ═════════════════════════════════════════════ */
function initObservers(){
  const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.target.id==='experimental')xOn=x.isIntersecting;});},{threshold:.15});
  const se=document.getElementById('skills'),xe=document.getElementById('experimental');
  if(se)io.observe(se);if(xe)io.observe(xe);
  const rio=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in');});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>rio.observe(el));
  const cio=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)animCounter(x.target);});},{threshold:.5});
  document.querySelectorAll('.counter').forEach(el=>cio.observe(el));
}
function animCounter(el){
  const t=parseInt(el.dataset.val),sup=el.querySelector('sup')?el.querySelector('sup').outerHTML:'';
  const start=performance.now();
  const step=now=>{const p=Math.min((now-start)/1600,1),ease=1-Math.pow(1-p,3);el.innerHTML=Math.floor(ease*t)+sup;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}

/* ═══ ARCHITECTURE FLOW ════════════════════════════════════ */
function initArchFlow() {
  if(typeof MotionPathPlugin === 'undefined') return;
  // Animate dots on ALL arch SVGs
  const flowSections = [
    { svgId: null, glowId: 'glow1', color: '#e8c56a' },
    { svgId: null, glowId: 'glow2', color: '#4d8fff' },
    { svgId: null, glowId: 'glow3', color: '#e8c56a' },
  ];
  document.querySelectorAll('.arch-flow').forEach((flowEl, idx) => {
    const svg = flowEl.querySelector('svg');
    if(!svg) return;
    const paths = flowEl.querySelectorAll('.arch-path');
    const glowId = flowSections[idx] ? flowSections[idx].glowId : 'glow1';
    const color = flowSections[idx] ? flowSections[idx].color : '#e8c56a';
    paths.forEach((p) => {
      for(let j = 0; j < 2; j++) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", color);
        dot.setAttribute("filter", `url(#${glowId})`);
        svg.appendChild(dot);
        gsap.to(dot, {
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          ease: "power1.inOut",
          motionPath: { path: p, align: p, alignOrigin: [0.5, 0.5] },
          delay: j * (1.2 + Math.random() * 0.8)
        });
      }
    });
  });
}

/* ═══ NEURON CANVAS ═══════════════════════════════════════════ */
let nCtx, nW, nH, neurons = [], nOn = false;
function initNeurons() {
  const c = document.getElementById('neuron-canvas');
  if(!c) return;
  nCtx = c.getContext('2d');
  const resize = () => {
    nW = c.width = c.offsetWidth;
    nH = c.height = c.offsetHeight;
    // Build neuron grid per-resize
    neurons = [];
    const cols = 6, rows = 4;
    for(let row = 0; row < rows; row++) {
      for(let col = 0; col < cols; col++) {
        neurons.push({
          x: (col + 0.5) * (nW / cols) + (Math.random() - 0.5) * 40,
          y: (row + 0.5) * (nH / rows) + (Math.random() - 0.5) * 40,
          r: Math.random() * 3 + 2,
          ph: Math.random() * Math.PI * 2,
          pulse: 0,
          connections: []
        });
      }
    }
    // Build sparse connections
    neurons.forEach((n, i) => {
      neurons.forEach((m, j) => {
        if(i !== j) {
          const dx = n.x - m.x, dy = n.y - m.y;
          if(Math.sqrt(dx*dx+dy*dy) < nW / 5) n.connections.push(j);
        }
      });
    });
  };
  resize();
  window.addEventListener('resize', resize);
  const expSec = document.getElementById('experimental');
  if(expSec) {
    const io = new IntersectionObserver(e => { e.forEach(x => { nOn = x.isIntersecting; }); }, { threshold: 0.1 });
    io.observe(expSec);
  }
}
function updateNeurons() {
  if(!nCtx || !nOn) return;
  const t = intel.t, e = intel.energy, f = intel.focus;
  nCtx.clearRect(0, 0, nW, nH);
  // Randomly fire pulses
  if(Math.random() < 0.04 + e * 0.08) {
    const n = neurons[Math.floor(Math.random() * neurons.length)];
    n.pulse = 1;
  }
  // Propagate pulses
  neurons.forEach(n => {
    if(n.pulse > 0.7) {
      n.connections.forEach(ci => {
        if(Math.random() < 0.3) neurons[ci].pulse = Math.max(neurons[ci].pulse, n.pulse * 0.7);
      });
    }
    n.pulse *= 0.88;
  });
  // Draw connections
  neurons.forEach((n, i) => {
    n.connections.forEach(ci => {
      if(ci > i) {
        const m = neurons[ci];
        const strength = (n.pulse + m.pulse) * 0.5;
        nCtx.beginPath();
        nCtx.moveTo(n.x, n.y);
        nCtx.lineTo(m.x, m.y);
        const baseA = 0.04 + e * 0.06;
        const pulseA = strength * 0.5;
        nCtx.strokeStyle = `rgba(201,168,76,${baseA + pulseA})`;
        nCtx.lineWidth = 0.5 + strength * 1.5;
        nCtx.stroke();
      }
    });
  });
  // Draw neurons
  neurons.forEach(n => {
    const glow = n.pulse > 0.1;
    const baseR = n.r + Math.sin(t * 1.2 + n.ph) * 0.5;
    const r = baseR + n.pulse * 4;
    if(glow) {
      const grad = nCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      grad.addColorStop(0, `rgba(201,168,76,${0.5 + n.pulse * 0.5})`);
      grad.addColorStop(1, 'rgba(201,168,76,0)');
      nCtx.beginPath();
      nCtx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
      nCtx.fillStyle = grad;
      nCtx.fill();
    }
    nCtx.beginPath();
    nCtx.arc(n.x, n.y, r, 0, Math.PI * 2);
    const phase = intel.phase === 'evolved' ? '77,143,255' : '201,168,76';
    nCtx.fillStyle = `rgba(${phase},${0.25 + n.pulse * 0.75})`;
    nCtx.fill();
  });
}

/* ═══ CONSULTING ORBIT CANVAS ══════════════════════════════════ */
let cCtx, cW, cH, cOn = false;
const CONSULT_NODES = [
  { label: 'Problem\nFraming',    icon: '◎', angle: 0 },
  { label: 'Data\nStrategy',      icon: '◈', angle: Math.PI*2/6 },
  { label: 'ML\nArchitecture',    icon: '✦', angle: Math.PI*4/6 },
  { label: 'Stakeholder\nAlign',  icon: '◉', angle: Math.PI*6/6 },
  { label: 'Technical\nAdvisory', icon: '◆', angle: Math.PI*8/6 },
  { label: 'Delivery &\nImpact',  icon: '→', angle: Math.PI*10/6 },
];
function initConsult() {
  const c = document.getElementById('consult-canvas');
  if(!c) return;
  cCtx = c.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    const rect = c.parentElement.getBoundingClientRect();
    cW = c.width = rect.width * dpr;
    cH = c.height = rect.height * dpr;
    c.style.width = rect.width + 'px';
    c.style.height = rect.height + 'px';
    cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
  const s = document.getElementById('consulting');
  if(s) {
    const io = new IntersectionObserver(e => { e.forEach(x => cOn = x.isIntersecting); }, { threshold: 0.1 });
    io.observe(s);
  }
}
function updateConsult() {
  if(!cCtx || !cOn) return;
  const dpr = window.devicePixelRatio || 1;
  const W = cW / dpr, H = cH / dpr;
  const cx = W/2, cy = H/2;
  const t = intel.t, e = intel.energy;
  cCtx.clearRect(0, 0, W, H);
  const R = Math.min(W,H) * 0.35;
  const tilt = 0.45;

  // Outer orbit ring (ellipse for 3D feel)
  cCtx.beginPath();
  cCtx.ellipse(cx, cy, R, R * tilt, 0, 0, Math.PI * 2);
  cCtx.strokeStyle = `rgba(201,168,76,0.08)`;
  cCtx.lineWidth = 1;
  cCtx.stroke();

  // Inner ring
  cCtx.beginPath();
  cCtx.arc(cx, cy, Math.min(W,H)*0.12, 0, Math.PI*2);
  cCtx.strokeStyle = `rgba(201,168,76,0.06)`;
  cCtx.lineWidth = 1;
  cCtx.stroke();

  // Spoke lines
  CONSULT_NODES.forEach((n, i) => {
    const angle = n.angle + t * 0.15;
    const nx = cx + R * Math.cos(angle);
    const ny = cy + R * tilt * Math.sin(angle);
    cCtx.beginPath();
    cCtx.moveTo(cx, cy);
    cCtx.lineTo(nx, ny);
    cCtx.strokeStyle = `rgba(201,168,76,${0.06 + e*0.08})`;
    cCtx.lineWidth = 0.5;
    cCtx.stroke();
  });

  // Center glow
  const cGrad = cCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W,H)*0.14);
  cGrad.addColorStop(0, `rgba(201,168,76,${0.5 + e*0.4})`);
  cGrad.addColorStop(0.5, `rgba(201,168,76,${0.08})`);
  cGrad.addColorStop(1, 'rgba(201,168,76,0)');
  cCtx.beginPath();
  cCtx.arc(cx, cy, Math.min(W,H)*0.14, 0, Math.PI*2);
  cCtx.fillStyle = cGrad;
  cCtx.fill();

  // Center circle
  const cr = Math.min(W,H)*0.065;
  cCtx.beginPath();
  cCtx.arc(cx, cy, cr, 0, Math.PI*2);
  cCtx.fillStyle = `rgba(8,12,18,0.95)`;
  cCtx.fill();
  cCtx.strokeStyle = `rgba(201,168,76,${0.5 + e*0.3})`;
  cCtx.lineWidth = 1.5;
  cCtx.stroke();

  // Expanding pulse ring on center
  const rp = (t * 0.5) % 1;
  cCtx.beginPath();
  cCtx.arc(cx, cy, cr + rp * R * 0.3, 0, Math.PI*2);
  cCtx.strokeStyle = `rgba(201,168,76,${(1-rp)*0.25})`;
  cCtx.lineWidth = 1;
  cCtx.stroke();

  // Orbital nodes
  CONSULT_NODES.forEach((n, i) => {
    const angle = n.angle + t * 0.15;
    const nx = cx + R * Math.cos(angle);
    const ny = cy + R * tilt * Math.sin(angle);
    const nodeR = Math.min(W,H) * 0.075;

    // Glow behind node
    const g = cCtx.createRadialGradient(nx, ny, 0, nx, ny, nodeR*1.8);
    g.addColorStop(0, `rgba(201,168,76,${0.12 + e*0.1})`);
    g.addColorStop(1, 'rgba(201,168,76,0)');
    cCtx.beginPath();
    cCtx.arc(nx, ny, nodeR*1.8, 0, Math.PI*2);
    cCtx.fillStyle = g;
    cCtx.fill();

    // Node circle
    cCtx.beginPath();
    cCtx.arc(nx, ny, nodeR, 0, Math.PI*2);
    cCtx.fillStyle = `rgba(8,12,18,0.92)`;
    cCtx.fill();
    cCtx.strokeStyle = `rgba(201,168,76,${0.3 + e*0.25})`;
    cCtx.lineWidth = 1;
    cCtx.stroke();

    // Icon
    cCtx.fillStyle = `rgba(201,168,76,${0.65 + e*0.25})`;
    cCtx.font = `${nodeR*0.5}px serif`;
    cCtx.textAlign = 'center';
    cCtx.textBaseline = 'middle';
    cCtx.fillText(n.icon, nx, ny - nodeR*0.2);

    // Label lines
    const lines = n.label.split('\n');
    cCtx.fillStyle = `rgba(232,226,214,${0.55 + e*0.2})`;
    cCtx.font = `bold ${nodeR*0.3}px 'Syne', sans-serif`;
    lines.forEach((ln, li) => cCtx.fillText(ln, nx, ny + nodeR*0.2 + li * nodeR*0.32));
  });
}

/* ═══ GSAP ══════════════════════════════════════════════════ */
function initGSAP(){
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.create({start:100,onToggle:s=>document.getElementById('navbar').classList.toggle('scrolled',s.isActive)});
  gsap.to('.hero-status',{opacity:1,y:0,duration:1,delay:.4,ease:'power3.out'});
  gsap.to('.hero-name-word',{y:0, rotation: 0, duration: 1.8, delay: 0.6, stagger: 0.15, ease: 'expo.out'});
  gsap.to('.hero-foot',{opacity:1,duration:1.2,delay:1.4,ease:'power3.out'});
  ScrollTrigger.create({trigger:'#project-list',start:'top 75%',onEnter:()=>gsap.from('.project-row',{y:35,opacity:0,stagger:.08,duration:.8,ease:'power3.out'})});
  ScrollTrigger.create({trigger:'.tl',start:'top 75%',onEnter:()=>gsap.from('.tl-item',{x:-25,stagger:.12,duration:.9,ease:'power3.out'})});
}

/* ═══ GRAIN ═════════════════════════════════════════════════ */
let gF=0;
function updateGrain(){gF++;if(gF%4===0){const g=document.getElementById('grain');g.style.backgroundPosition=`${Math.random()*100}% ${Math.random()*100}%`;g.style.backgroundSize=(170+Math.random()*50)+'px';}}

/* ═══ MASTER ENGINE LOOP ════════════════════════════════════ */
function engineLoop(){
  updateIntel();
  updateMaster();
  updateEntity();
  
  updateExp();
  updateCursor();
  updateGrain();
  updateNeurons();
  updateConsult();
  requestAnimationFrame(engineLoop);
}

/* ═══ CONTACT ═══════════════════════════════════════════════ */
document.getElementById('cform').addEventListener('submit',e=>{e.preventDefault();const b=document.getElementById('stext');b.textContent='Sent ✓';intel.interaction=1;setTimeout(()=>b.textContent='Send message',3000);});

/* ═══ SMOOTH SCROLL ═════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});});

/* ═══ LOADER + BOOT ═════════════════════════════════════════ */
(function(){
  const phases=['Initializing','Loading intelligence','Calibrating systems','Ready'];
  let count=0;
  const fill=document.getElementById('loader-fill'),pct=document.getElementById('loader-pct'),ph=document.getElementById('loader-phase');
  setTimeout(()=>{document.getElementById('lw1').classList.add('up');},120);
  setTimeout(()=>{document.getElementById('lw2').classList.add('up');fill.style.width='100%';},220);
  const tick=setInterval(()=>{
    count=Math.min(count+Math.floor(Math.random()*13)+5,100);
    pct.textContent=String(count).padStart(3,'0');
    ph.textContent=phases[Math.floor((count/100)*(phases.length-1))];
    if(count>=100){
      clearInterval(tick);
      setTimeout(()=>{
        const l=document.getElementById('loader');l.style.transition='opacity .8s';l.style.opacity='0';
        setTimeout(()=>{
          l.style.display='none';
          initMaster();initEntity();initExp();
          renderProjects();initObservers();initGSAP();initArchFlow();initNeurons();initConsult();
          engineLoop();
        },800);
      },350);
    }
  },32);
})();

document.querySelectorAll('.bento-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
    intel.interaction = Math.min(1, intel.interaction + .25);
  });
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

document.querySelectorAll('.human-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
    intel.humanZone = el.id.replace('hc-', '');
    intel.interaction = 1;
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
    intel.humanZone = null;
  });
});
