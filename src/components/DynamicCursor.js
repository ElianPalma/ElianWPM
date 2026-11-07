import React, { useState, useEffect } from 'react';

const DynamicCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState('default');
  const [clicked, setClicked] = useState(false);
  // En pantallas táctiles no hay cursor: no se dibuja el aro
  const isTouch = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleHover = () => {
      const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover], div, section, article, aside, nav, main');

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (el.dataset.cursorHover) {
            setHoverState(el.dataset.cursorHover);
          } else if (el.tagName === 'A') {
            setHoverState('link');
          } else if (el.tagName === 'BUTTON') {
            setHoverState('button');
          } else {
            setHoverState('hovered');
          }
        });
        el.addEventListener('mouseleave', () => setHoverState('default'));
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    handleHover();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover], div, section, article, aside, nav, main');
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const cursorClasses = {
    default: 'w-8 h-8 border-2 border-violet-400/80 rounded-full backdrop-blur-sm',
    link: 'w-12 h-12 bg-violet-500/25 rounded-full transform scale-150',
    button: 'w-10 h-10 bg-violet-600/30 rounded-full border-2 border-cyan-300',
    text: 'w-6 h-6 bg-blue-500/50 rounded-full transform scale-75',
    image: 'w-16 h-16 bg-white/10 rounded-full backdrop-blur-md',
    hovered: 'w-10 h-10 bg-gray-300/50 rounded-full border border-gray-400',
  };

  const cursorStyle = {
    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
    transition: hoverState === 'default' ? 'transform 0.1s ease-out' : 'transform 0.2s ease-out, width 0.3s ease, height 0.3s ease',
    pointerEvents: 'none',
    zIndex: 999999,
  };

  if (isTouch) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none ${cursorClasses[hoverState]} ${
        clicked ? 'transform scale-90' : ''
      }`}
      style={cursorStyle}
    >
      {hoverState === 'default' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
        </div>
      )}
      {hoverState === 'link' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white font-bold">VAMOS</span>
        </div>
      )}
      {hoverState === 'button' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white font-bold">CLIC</span>
        </div>
      )}
      {hoverState === 'hovered' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
        </div>
      )}
    </div>
  );
};

export default DynamicCursor;