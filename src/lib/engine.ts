import { intel } from './store';

export const canvasRegistry = {
  master: null as HTMLCanvasElement | null,
  entity: null as HTMLCanvasElement | null,
  exp: null as HTMLCanvasElement | null,
  neuron: null as HTMLCanvasElement | null,
  consult: null as HTMLCanvasElement | null,
};

// Canvas Contexts
let mCtx: CanvasRenderingContext2D | null = null;
let mW = 0, mH = 0;
let mParts: any[] = [];

let eCtx: CanvasRenderingContext2D | null = null;
let eRW = 0, eRH = 0;

let xCtx: CanvasRenderingContext2D | null = null;
let xW = 0, xH = 0;
let xParts: any[] = [];
export let xOn = false;

let nCtx: CanvasRenderingContext2D | null = null;
let nW = 0, nH = 0;
let neurons: any[] = [];
export let nOn = false;

let cCtx: CanvasRenderingContext2D | null = null;
let cW = 0, cH = 0;
export let cOn = false;

const CONSULT_NODES = [
  { label: 'Problem\nFraming',    icon: '◎', angle: 0 },
  { label: 'Data\nStrategy',      icon: '◈', angle: Math.PI*2/6 },
  { label: 'ML\nArchitecture',    icon: '✦', angle: Math.PI*4/6 },
  { label: 'Stakeholder\nAlign',  icon: '◉', angle: Math.PI*6/6 },
  { label: 'Technical\nAdvisory', icon: '◆', angle: Math.PI*8/6 },
  { label: 'Delivery &\nImpact',  icon: '→', angle: Math.PI*10/6 },
];

export function setXOn(val: boolean) { xOn = val; }
export function setNOn(val: boolean) { nOn = val; }
export function setCOn(val: boolean) { cOn = val; }

/* ═══ INITIALIZERS ═══ */

export function initMaster(c: HTMLCanvasElement) {
  canvasRegistry.master = c;
  mCtx = c.getContext('2d');
  const resize = () => { mW = c.width = window.innerWidth; mH = c.height = window.innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const n = Math.min(Math.floor(mW * mH / 14000), 90);
  mParts = Array.from({ length: n }, () => ({
    x: Math.random() * mW, y: Math.random() * mH,
    vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .12,
    r: Math.random() * 1.1 + .3, a: Math.random() * .2 + .04, ph: Math.random() * Math.PI * 2
  }));
}

export function initEntity(c: HTMLCanvasElement) {
  canvasRegistry.entity = c;
  eCtx = c.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    eRW = c.offsetWidth; eRH = c.offsetHeight;
    c.width = eRW * dpr; c.height = eRH * dpr;
    eCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize(); window.addEventListener('resize', resize);
}

export function initExp(c: HTMLCanvasElement) {
  canvasRegistry.exp = c;
  xCtx = c.getContext('2d');
  const resize = () => {
    xW = c.width = c.offsetWidth; xH = c.height = c.offsetHeight;
    const n = Math.min(Math.floor(xW * xH / 3200), 280);
    xParts = Array.from({ length: n }, () => ({
      x: Math.random() * xW, y: Math.random() * xH, vx: 0, vy: 0,
      sz: Math.random() * 2 + .5, hue: Math.random() * 40 + 20, ph: Math.random() * Math.PI * 2
    }));
  };
  resize(); window.addEventListener('resize', resize);
}

export function initNeurons(c: HTMLCanvasElement) {
  canvasRegistry.neuron = c;
  nCtx = c.getContext('2d');
  const resize = () => {
    nW = c.width = c.offsetWidth; nH = c.height = c.offsetHeight;
    neurons = [];
    const cols = 6, rows = 4;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        neurons.push({
          x: (col + 0.5) * (nW / cols) + (Math.random() - 0.5) * 40,
          y: (row + 0.5) * (nH / rows) + (Math.random() - 0.5) * 40,
          r: Math.random() * 3 + 2, ph: Math.random() * Math.PI * 2, pulse: 0, connections: []
        });
      }
    }
    neurons.forEach((n, i) => {
      neurons.forEach((m, j) => {
        if (i !== j) {
          const dx = n.x - m.x, dy = n.y - m.y;
          if (Math.sqrt(dx * dx + dy * dy) < nW / 5) n.connections.push(j);
        }
      });
    });
  };
  resize(); window.addEventListener('resize', resize);
}

export function initConsult(c: HTMLCanvasElement) {
  canvasRegistry.consult = c;
  cCtx = c.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    const rect = c.parentElement?.getBoundingClientRect();
    if (!rect) return;
    cW = c.width = rect.width * dpr; cH = c.height = rect.height * dpr;
    c.style.width = rect.width + 'px'; c.style.height = rect.height + 'px';
    cCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize(); window.addEventListener('resize', resize);
}

/* ═══ UPDATE FUNCTIONS ═══ */

export function updateIntel() {
  const sf = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
  intel.energy = Math.min(1, sf * 1.3);
  const vx = intel.mx - intel.pmx, vy = intel.my - intel.pmy;
  const spd = Math.sqrt(vx * vx + vy * vy) * 120;
  intel.focus = Math.min(1, intel.focus * 0.93 + spd * 0.07);
  intel.pmx = intel.mx; intel.pmy = intel.my;
  intel.interaction = Math.max(0, intel.interaction * 0.985);

  if (sf < 0.15) intel.phase = 'init';
  else if (sf < 0.38) intel.phase = 'learning';
  else if (sf < 0.6) intel.phase = 'evolving';
  else intel.phase = 'evolved';

  const humSec = document.getElementById('human');
  if (humSec) {
    const rect = humSec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.2) {
      intel.mode = 'organic';
    } else {
      intel.mode = 'analytical';
      intel.humanZone = null;
    }
  }
  intel.omT += ((intel.mode === 'organic' ? 1 : 0) - intel.omT) * 0.03;
  intel.t += 0.01;
  
  // HUD DOM Updates (Opting for direct DOM here to save React re-renders on requestAnimationFrame)
  const ep = Math.round(intel.energy * 100), fp = Math.round(intel.focus * 100);
  const he = document.getElementById('hud-e'); if(he) he.style.width = ep + '%';
  const hf = document.getElementById('hud-f'); if(hf) hf.style.width = fp + '%';
  const hev = document.getElementById('hud-ev'); if(hev) hev.textContent = String(ep);
  const hfv = document.getElementById('hud-fv'); if(hfv) hfv.textContent = String(fp);
  const hph = document.getElementById('hud-ph'); if(hph) hph.textContent = intel.phase.toUpperCase();
  const nph = document.getElementById('nav-ph'); if(nph) nph.textContent = 'Intelligence · ' + intel.phase;
  const ebar = document.getElementById('exp-ebar'); if(ebar) ebar.style.width = (intel.energy * 100) + '%';
}

function updateMaster() {
  if (!mCtx) return;
  mCtx.clearRect(0, 0, mW, mH);
  const e = intel.energy, f = intel.focus, t = intel.t;
  const fric = 0.972 + (intel.omT * 0.02);
  mParts.forEach(p => {
    const att = e * (0.0006 - intel.omT * 0.0004);
    if (intel.humanZone === 'pingpong') {
      const dx = intel.mx * mW - p.x, dy = intel.my * mH - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) { p.vx -= (dx / d) * 0.5; p.vy -= (dy / d) * 0.5; }
      else { p.vx += dx * att * 4; p.vy += dy * att * 4; }
    } else if (intel.humanZone === 'pets') {
      const dx = intel.mx * mW - p.x, dy = intel.my * mH - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 400) { p.vx += dx * 0.0003; p.vy += dy * 0.0003; }
    } else if (intel.humanZone === 'nature') {
      const nx = p.x / mW;
      p.vx += Math.sin(nx * 8 + t) * 0.06;
      p.vy += Math.cos(p.y / mH * 8 - t) * 0.03;
      p.vx += (intel.mx * mW - p.x) * att * 0.2;
      p.vy += (intel.my * mH - p.y) * att * 0.2;
    } else {
      p.vx += (intel.mx * mW - p.x) * att;
      p.vy += (intel.my * mH - p.y) * att;
      if (intel.phase === 'evolved') { p.vx += Math.sin(t * .5 + p.ph) * .015 * e; p.vy += Math.cos(t * .4 + p.ph) * .015 * e; }
    }

    p.vx *= fric; p.vy *= fric;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = mW; if (p.x > mW) p.x = 0; if (p.y < 0) p.y = mH; if (p.y > mH) p.y = 0;

    const pa = p.a * (1 + Math.sin(t * 1.1 + p.ph) * .28) * (1 + e * .45);
    let tr = 201, tg = 168, tb = 76;
    if (intel.phase === 'evolved') { tr = 77; tg = 143; tb = 255; }
    else if (intel.phase === 'evolving') { tr = 140; tg = 150; tb = 220; }
    const or = 232, og = 180 + Math.sin(p.ph) * 25, ob = 120;
    const cr = Math.round(tr + (or - tr) * intel.omT);
    const cg = Math.round(tg + (og - tg) * intel.omT);
    const cb = Math.round(tb + (ob - tb) * intel.omT);

    mCtx!.beginPath(); mCtx!.arc(p.x, p.y, p.r + intel.omT * 0.5, 0, Math.PI * 2); mCtx!.fillStyle = `rgba(${cr},${cg},${cb},${pa})`; mCtx!.fill();
    p._cr = cr; p._cg = cg; p._cb = cb;
  });

  for (let i = 0; i < mParts.length; i++) {
    for (let j = i + 1; j < mParts.length; j++) {
      const dx = mParts[i].x - mParts[j].x, dy = mParts[i].y - mParts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy), mx = 90 + e * 70;
      if (d < mx) {
        const a = (1 - d / mx) * .055 * (1 + e * .6);
        const pa = mParts[i];
        mCtx!.beginPath(); mCtx!.moveTo(mParts[i].x, mParts[i].y);
        if (intel.omT > 0.1) {
          const cx = (mParts[i].x + mParts[j].x) / 2 + Math.sin(t + i) * 15 * intel.omT;
          const cy = (mParts[i].y + mParts[j].y) / 2 + Math.cos(t + j) * 15 * intel.omT;
          mCtx!.quadraticCurveTo(cx, cy, mParts[j].x, mParts[j].y);
        } else {
          mCtx!.lineTo(mParts[j].x, mParts[j].y);
        }
        mCtx!.strokeStyle = `rgba(${pa._cr},${pa._cg},${pa._cb},${a})`; mCtx!.lineWidth = .5; mCtx!.stroke();
      }
    }
  }
}

function updateEntity() {
  if (!eCtx) return;
  const W = eRW, H = eRH, cx = W / 2, cy = H / 2, t = intel.t, e = intel.energy, f = intel.focus;
  eCtx.clearRect(0, 0, W, H);
  const morph = Math.sin(t * .5 + e * 3) * .5 + .5;
  const numRings = Math.floor(3 + e * 6);
  for (let r = 0; r < numRings; r++) {
    const frac = r / numRings;
    const rad = 35 + frac * (Math.min(W, H) * .36);
    const pts = Math.floor(5 + r * 3 + e * 7);
    const rot = t * (r % 2 === 0 ? 1 : -1) * (.004 + e * .009) + (r * Math.PI * 2 / numRings);
    eCtx.beginPath();
    for (let p = 0; p <= pts; p++) {
      const ang = (p / pts) * Math.PI * 2 + rot;
      const nA = 7 + morph * 18 + e * 28 + f * 12;
      const ns = Math.sin(ang * 3 + t * 1.2 + r) * nA + Math.cos(ang * 5 - t * .8) * nA * .45;
      const rx = cx + (rad + ns) * Math.cos(ang), ry = cy + (rad + ns) * Math.sin(ang);
      p === 0 ? eCtx.moveTo(rx, ry) : eCtx.lineTo(rx, ry);
    }
    eCtx.closePath();
    const a = (.055 + e * .05) * (1 - frac * .35);
    const h = intel.phase === 'evolved' ? 210 + frac * 40 : 40 + frac * 18;
    const s = intel.phase === 'evolved' ? '65%' : '48%';
    eCtx.strokeStyle = `hsla(${h},${s},68%,${a})`; eCtx.lineWidth = 1; eCtx.stroke();
  }
  const cR = 10 + morph * 7 + e * 15;
  const g = eCtx.createRadialGradient(cx, cy, 0, cx, cy, cR * 2.2);
  g.addColorStop(0, `rgba(201,168,76,${.35 + e * .3})`);
  g.addColorStop(.5, `rgba(201,168,76,${.08 + e * .08})`);
  g.addColorStop(1, 'rgba(201,168,76,0)');
  eCtx.beginPath(); eCtx.arc(cx, cy, cR * 2.2, 0, Math.PI * 2); eCtx.fillStyle = g; eCtx.fill();
  const orbN = Math.floor(3 + e * 9);
  for (let i = 0; i < orbN; i++) {
    const ang = (i / orbN) * Math.PI * 2 + t * (.3 + e * .4);
    const dst = 55 + e * 75 + Math.sin(t * .7 + i) * 18;
    const ox = cx + dst * Math.cos(ang), oy = cy + dst * Math.sin(ang);
    const or = 1.8 + morph * 2 + e * 2.5;
    eCtx.beginPath(); eCtx.arc(ox, oy, or, 0, Math.PI * 2);
    eCtx.fillStyle = `rgba(201,168,76,${.28 + e * .38})`; eCtx.fill();
    eCtx.beginPath(); eCtx.moveTo(cx, cy); eCtx.lineTo(ox, oy);
    eCtx.strokeStyle = `rgba(201,168,76,${.035 + e * .055})`; eCtx.lineWidth = .5; eCtx.stroke();
  }
}

function updateExp() {
  if (!xCtx || !xOn) return;
  const t = intel.t, e = intel.energy, f = intel.focus, mx = intel.mx * xW, my = intel.my * xH;
  xCtx.fillStyle = 'rgba(3,5,7,0.14)'; xCtx.fillRect(0, 0, xW, xH);
  xParts.forEach(p => {
    const nx = p.x / xW, ny = p.y / xH;
    const ang = Math.sin(nx * 4 + t * .3 + p.ph) * Math.PI + Math.cos(ny * 3 - t * .2) * Math.PI;
    p.vx += Math.cos(ang) * (.08 + e * .25); p.vy += Math.sin(ang) * (.08 + e * .25);
    const dx = mx - p.x, dy = my - p.y, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 220) { p.vx += (dx / dist) * f * 1.8 * intel.interaction; p.vy += (dy / dist) * f * 1.8 * intel.interaction; }
    if (intel.phase === 'evolved') { p.vx += Math.sin(t * 1.8 + p.ph) * .12 * e; p.vy += Math.cos(t * 1.5 + p.ph) * .12 * e; }
    p.vx *= .91; p.vy *= .91;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = xW; if (p.x > xW) p.x = 0; if (p.y < 0) p.y = xH; if (p.y > xH) p.y = 0;
    const hs = intel.phase === 'evolved' ? 200 + intel.energy * 40 : p.hue + intel.energy * 18;
    const sa = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) * .3);
    xCtx!.beginPath(); xCtx!.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
    xCtx!.fillStyle = `hsla(${hs},58%,64%,${.18 + sa * .55})`; xCtx!.fill();
  });
}

function updateNeurons() {
  if (!nCtx || !nOn) return;
  const t = intel.t, e = intel.energy, f = intel.focus;
  nCtx.clearRect(0, 0, nW, nH);
  if (Math.random() < 0.04 + e * 0.08) {
    const n = neurons[Math.floor(Math.random() * neurons.length)];
    n.pulse = 1;
  }
  neurons.forEach(n => {
    if (n.pulse > 0.7) {
      n.connections.forEach((ci: number) => {
        if (Math.random() < 0.3) neurons[ci].pulse = Math.max(neurons[ci].pulse, n.pulse * 0.7);
      });
    }
    n.pulse *= 0.88;
  });
  neurons.forEach((n, i) => {
    n.connections.forEach((ci: number) => {
      if (ci > i) {
        const m = neurons[ci];
        const strength = (n.pulse + m.pulse) * 0.5;
        nCtx!.beginPath(); nCtx!.moveTo(n.x, n.y); nCtx!.lineTo(m.x, m.y);
        const baseA = 0.04 + e * 0.06;
        const pulseA = strength * 0.5;
        nCtx!.strokeStyle = `rgba(201,168,76,${baseA + pulseA})`;
        nCtx!.lineWidth = 0.5 + strength * 1.5;
        nCtx!.stroke();
      }
    });
  });
  neurons.forEach(n => {
    const glow = n.pulse > 0.1;
    const baseR = n.r + Math.sin(t * 1.2 + n.ph) * 0.5;
    const r = baseR + n.pulse * 4;
    if (glow) {
      const grad = nCtx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      grad.addColorStop(0, `rgba(201,168,76,${0.5 + n.pulse * 0.5})`);
      grad.addColorStop(1, 'rgba(201,168,76,0)');
      nCtx!.beginPath(); nCtx!.arc(n.x, n.y, r * 4, 0, Math.PI * 2); nCtx!.fillStyle = grad; nCtx!.fill();
    }
    nCtx!.beginPath(); nCtx!.arc(n.x, n.y, r, 0, Math.PI * 2);
    const phase = intel.phase === 'evolved' ? '77,143,255' : '201,168,76';
    nCtx!.fillStyle = `rgba(${phase},${0.25 + n.pulse * 0.75})`; nCtx!.fill();
  });
}

function updateConsult() {
  if (!cCtx || !cOn) return;
  const dpr = window.devicePixelRatio || 1;
  const W = cW / dpr, H = cH / dpr;
  const cx = W / 2, cy = H / 2;
  const t = intel.t, e = intel.energy;
  cCtx.clearRect(0, 0, W, H);
  const R = Math.min(W, H) * 0.35;
  const tilt = 0.45;

  cCtx.beginPath(); cCtx.ellipse(cx, cy, R, R * tilt, 0, 0, Math.PI * 2);
  cCtx.strokeStyle = `rgba(201,168,76,0.08)`; cCtx.lineWidth = 1; cCtx.stroke();
  cCtx.beginPath(); cCtx.arc(cx, cy, Math.min(W, H) * 0.12, 0, Math.PI * 2);
  cCtx.strokeStyle = `rgba(201,168,76,0.06)`; cCtx.lineWidth = 1; cCtx.stroke();

  CONSULT_NODES.forEach((n) => {
    const angle = n.angle + t * 0.15;
    const nx = cx + R * Math.cos(angle);
    const ny = cy + R * tilt * Math.sin(angle);
    cCtx!.beginPath(); cCtx!.moveTo(cx, cy); cCtx!.lineTo(nx, ny);
    cCtx!.strokeStyle = `rgba(201,168,76,${0.06 + e * 0.08})`; cCtx!.lineWidth = 0.5; cCtx!.stroke();
  });

  const cGrad = cCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.14);
  cGrad.addColorStop(0, `rgba(201,168,76,${0.5 + e * 0.4})`);
  cGrad.addColorStop(0.5, `rgba(201,168,76,${0.08})`);
  cGrad.addColorStop(1, 'rgba(201,168,76,0)');
  cCtx.beginPath(); cCtx.arc(cx, cy, Math.min(W, H) * 0.14, 0, Math.PI * 2); cCtx.fillStyle = cGrad; cCtx.fill();

  const cr = Math.min(W, H) * 0.065;
  cCtx.beginPath(); cCtx.arc(cx, cy, cr, 0, Math.PI * 2); cCtx.fillStyle = `rgba(8,12,18,0.95)`; cCtx.fill();
  cCtx.strokeStyle = `rgba(201,168,76,${0.5 + e * 0.3})`; cCtx.lineWidth = 1.5; cCtx.stroke();

  const rp = (t * 0.5) % 1;
  cCtx.beginPath(); cCtx.arc(cx, cy, cr + rp * R * 0.3, 0, Math.PI * 2);
  cCtx.strokeStyle = `rgba(201,168,76,${(1 - rp) * 0.25})`; cCtx.lineWidth = 1; cCtx.stroke();

  CONSULT_NODES.forEach((n) => {
    const angle = n.angle + t * 0.15;
    const nx = cx + R * Math.cos(angle);
    const ny = cy + R * tilt * Math.sin(angle);
    const nodeR = Math.min(W, H) * 0.075;

    const g = cCtx!.createRadialGradient(nx, ny, 0, nx, ny, nodeR * 1.8);
    g.addColorStop(0, `rgba(201,168,76,${0.12 + e * 0.1})`); g.addColorStop(1, 'rgba(201,168,76,0)');
    cCtx!.beginPath(); cCtx!.arc(nx, ny, nodeR * 1.8, 0, Math.PI * 2); cCtx!.fillStyle = g; cCtx!.fill();

    cCtx!.beginPath(); cCtx!.arc(nx, ny, nodeR, 0, Math.PI * 2);
    cCtx!.fillStyle = `rgba(8,12,18,0.92)`; cCtx!.fill();
    cCtx!.strokeStyle = `rgba(201,168,76,${0.3 + e * 0.25})`; cCtx!.lineWidth = 1; cCtx!.stroke();

    cCtx!.fillStyle = `rgba(201,168,76,${0.65 + e * 0.25})`;
    cCtx!.font = `${nodeR * 0.5}px serif`; cCtx!.textAlign = 'center'; cCtx!.textBaseline = 'middle';
    cCtx!.fillText(n.icon, nx, ny - nodeR * 0.2);

    const lines = n.label.split('\n');
    cCtx!.fillStyle = `rgba(232,226,214,${0.55 + e * 0.2})`;
    cCtx!.font = `bold ${nodeR * 0.3}px var(--f-sans)`;
    lines.forEach((ln, li) => cCtx!.fillText(ln, nx, ny + nodeR * 0.2 + li * nodeR * 0.32));
  });
}

// Grain updater
let gF = 0;
export function updateGrain() {
  gF++;
  if (gF % 4 === 0) {
    const g = document.getElementById('grain');
    if (g) {
      g.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
      g.style.backgroundSize = (170 + Math.random() * 50) + 'px';
    }
  }
}

let engineRunning = false;
export function startEngine() {
  if (engineRunning) return;
  engineRunning = true;
  engineLoop();
}

export function stopEngine() {
  engineRunning = false;
}

function engineLoop() {
  if (!engineRunning) return;

  updateIntel();
  updateMaster();
  updateEntity();
  updateExp();
  updateGrain();
  updateNeurons();
  updateConsult();
  updateCursor();

  requestAnimationFrame(engineLoop);
}

// Global Cursor variables
let cMx = 0, cMy = 0, cRx = 0, cRy = 0, cTx = 0, cTy = 0;
export function trackMouse(e: MouseEvent) {
  cMx = e.clientX; cMy = e.clientY;
  intel.mx = e.clientX / window.innerWidth;
  intel.my = e.clientY / window.innerHeight;
}

function updateCursor() {
  cRx += (cMx - cRx) * .14; cRy += (cMy - cRy) * .14;
  cTx += (cMx - cTx) * .06; cTy += (cMy - cTy) * .06;
  const cDot = document.getElementById('c-dot');
  const cRing = document.getElementById('c-ring');
  const cTrail = document.getElementById('c-trail');
  if(cDot) { cDot.style.left = cMx + 'px'; cDot.style.top = cMy + 'px'; }
  if(cRing) { cRing.style.left = cRx + 'px'; cRing.style.top = cRy + 'px'; }
  if(cTrail) { cTrail.style.left = cTx + 'px'; cTrail.style.top = cTy + 'px'; }
}
