"use client";

import { useEffect, useState } from "react";
import { intel } from "@/lib/store";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [phase, setPhase] = useState(intel.phase);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Poll the global intel object for phase updates.
    // (Since engineLoop doesn't trigger React re-renders for performance)
    const interval = setInterval(() => {
      if (intel.phase !== phase) setPhase(intel.phase);
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [phase]);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">Ankit Premi</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#expertise">Expertise</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-intel">
        <div className="nav-pulse"></div>
        <span id="nav-ph">Intelligence · {phase.toUpperCase()}</span>
      </div>
    </nav>
  );
}
