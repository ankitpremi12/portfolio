"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function GSAPInitializer() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // Reveal classes observer
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((x) => {
        if (x.isIntersecting) x.target.classList.add('in');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    // Counter animations
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((x) => {
        if (x.isIntersecting) {
          const el = x.target as HTMLElement;
          const t = parseInt(el.dataset.val || "0");
          const sup = el.querySelector('sup') ? el.querySelector('sup')?.outerHTML : '';
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / 1600, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.innerHTML = Math.floor(ease * t) + (sup || "");
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    let ctx = gsap.context(() => {
      // Setup hero initial states cleanly to avoid React 18 strict mode double-firing corrupting starting values
      // Initial load staggers
      gsap.fromTo('.hero-status', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
      gsap.fromTo('.hero-name-word', { y: '120%', rotation: 8 }, { y: '0%', rotation: 0, duration: 1.8, delay: 0.6, stagger: 0.15, ease: 'expo.out' });
      gsap.fromTo('.hero-foot', { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 1.4, ease: 'power3.out' });

      // Scroll reveal triggers
      ScrollTrigger.create({
        trigger: '#project-list',
        start: 'top 75%',
        onEnter: () => gsap.fromTo('.project-row', { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', overwrite: true })
      });

      document.querySelectorAll('.reveal').forEach((el) => rio.observe(el));
      document.querySelectorAll('.counter').forEach((el) => cio.observe(el));
    });

    return () => {
      ctx.revert(); // Automatically kills scroll triggers and resets animations
      rio.disconnect();
      cio.disconnect();
    };
  }, []);

  return null;
}
