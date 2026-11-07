import { useEffect } from 'react';

/**
 * Efecto "foco de luz" que sigue al cursor sobre cualquier elemento con la
 * clase .spotlight. Un solo listener global (delegación de eventos), así que
 * no hay estado ni re-renders por tarjeta.
 */
const useSpotlight = () => {
  useEffect(() => {
    // En pantallas táctiles no hay cursor: no hace falta el listener.
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return undefined;

    const handleMove = (e) => {
      const el = e.target.closest ? e.target.closest('.spotlight') : null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
};

export default useSpotlight;
