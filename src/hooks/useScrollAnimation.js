import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transitionDelay = `${index * 0.1}s`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default useScrollAnimation;

// DONE