"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectModal from "@/components/ProjectModal";
import { intel } from "@/lib/store";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<any>(null);

  const openProject = (p: any) => {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
    intel.interaction = 1;
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <section className="section" id="work">
        <div className="wrap">
          <div className="s-marker reveal"><span className="s-marker-num">03</span>Deployment</div>
          <h2 className="work-heading reveal">Selected<br/>Work</h2>
          <div id="project-list">
            {PROJECTS.map((p) => (
              <div 
                key={p.id} 
                className="project-row"
                onClick={() => openProject(p)}
                onMouseEnter={() => {
                  document.body.classList.add('hovering');
                  intel.interaction = Math.min(1, intel.interaction + 0.25);
                }}
                onMouseLeave={() => document.body.classList.remove('hovering')}
              >
                <div className="pr-num">{p.num}</div>
                <div className="pr-title">{p.title}</div>
                <div className="pr-desc">{p.desc}</div>
                <div className="pr-tags">
                  {p.tags.map(t => <span key={t} className="pr-tag">{t}</span>)}
                </div>
                <div className="pr-year">{p.year}</div>
                <div className="pr-arrow">↗</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Persist the modal in DOM so it can close nicely, actually wait... 
          if activeProject is null, ProjectModal returns null. 
          The CSS transition won't play if it's instantly unmounted. 
          Let's pass the activeProject but structure ProjectModal so it exists. */}
      {activeProject && <ProjectModal project={activeProject} onClose={closeProject} />}
    </>
  );
}
