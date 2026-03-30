"use client";

import { useEffect } from 'react';
import { startEngine, stopEngine, trackMouse } from '@/lib/engine';

export default function GlobalEngine() {
  useEffect(() => {
    startEngine();
    window.addEventListener('mousemove', trackMouse);

    return () => {
      stopEngine();
      window.removeEventListener('mousemove', trackMouse);
    };
  }, []);

  return null;
}
