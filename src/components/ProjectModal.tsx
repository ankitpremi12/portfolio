"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PROJECTS, FLOWS, V_FLOWS } from "@/data/projects";

gsap.registerPlugin(MotionPathPlugin);

interface Project {
  id: string;
  num: string;
  title: string;
  year: string;
  tags: string[];
  desc: string;
  bullets: string[];
  tech: string;
  glowColor: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const flowSvg = project ? (isMobile ? (V_FLOWS[project.id] || FLOWS[project.id]) : FLOWS[project.id]) : null;

  useEffect(() => {
    if (!project || !flowSvg || !containerRef.current) return;
    
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const svg = containerRef.current.querySelector('.modal-flow-svg');
      const paths = containerRef.current.querySelectorAll('.mf-path') as NodeListOf<SVGPathElement>;
      
      if (!svg || !paths.length) return;
      
      paths.forEach((path) => {
        for (let j = 0; j < 2; j++) {
          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dot.setAttribute("r", isMobile ? "2.5" : "3.5");
          dot.setAttribute("fill", project.glowColor || "#e8c56a");
          dot.setAttribute("filter", "url(#mf-glow)");
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
    }, 50);

    return () => clearTimeout(timer);
  }, [project, flowSvg, isMobile]);

  if (!project) return null;

  return (
    <div id="modal" className={isOpen ? "open" : ""} ref={containerRef}>
      <button id="modal-close" className="modal-close" onClick={onClose}>
        Close <div className="modal-x">✕</div>
      </button>
      <div className="modal-wrap">
        <div id="modal-body">
          <div className="modal-eyebrow">{project.num} / 0{PROJECTS.length} · Selected Work</div>
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-hr"></div>
          <div className="modal-grid">
            <div>
              <div className="modal-sl">Overview</div>
              <p className="modal-text">{project.desc}</p>
              <div className="modal-hr"></div>
              <div className="modal-sl">Key Achievements</div>
              <ul className="modal-list">
                {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div>
              <div className="modal-sl">Timeline</div>
              <p className="modal-text">{project.year}</p>
              <div className="modal-hr"></div>
              <div className="modal-sl">Tech Stack</div>
              <div className="modal-chips">
                {project.tech.split(' · ').map((t, i) => <span key={i} className="modal-chip">{t}</span>)}
              </div>
            </div>
          </div>
          {flowSvg && (
            <>
              <div className="modal-hr"></div>
              <div className="modal-sl">System Architecture</div>
              <div className="modal-flow-wrap" dangerouslySetInnerHTML={{ __html: flowSvg }}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
