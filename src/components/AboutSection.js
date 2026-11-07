import React, { useState, useEffect, useRef } from 'react';

// Resalta la sintaxis de cada línea del bloque de código (solo visual)
const highlight = (line) => {
  const parts = line.split(/('[^']*'|\b\d+\+?|\b[a-zA-Z_]+(?=:)|\bconst\b)/g).filter((p) => p !== '');
  return parts.map((part, i) => {
    let cls = 'text-gray-300';
    if (/^'.*'$/.test(part)) cls = 'text-amber-300';
    else if (/^\d+\+?$/.test(part)) cls = 'text-violet-300';
    else if (part === 'const') cls = 'text-pink-400';
    else if (/^[a-zA-Z_]+$/.test(part) && line.includes(`${part}:`)) cls = 'text-cyan-300';
    return <span key={i} className={cls}>{part}</span>;
  });
};

const stats = [
  { title: 'Experiencia', text: 'Más de 60 proyectos exitosos entregados' },
  { title: 'Tecnologías', text: 'Más de 30 tecnologías dominadas' },
  { title: 'Enfoque', text: 'Resultados, calidad y la experiencia del usuario' },
];

const AboutSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const codeBlockContainerRef = useRef(null);
  const statsContainerRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

    const handleMouseMove = (e) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    // Visibilidad general de la sección (activa el efecto del mouse solo cuando se ve)
    const mainObserver = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) mainObserver.observe(sectionRef.current);

    // Animación de entrada de los elementos
    const headerContentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          headerContentObserver.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    if (headerRef.current) headerContentObserver.observe(headerRef.current);

    if (canHover) window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mainObserver.disconnect();
      headerContentObserver.disconnect();
    };
  }, []);

  const codeLines = [
    "const developer = {",
    "  name: 'Elian palma',",
    "  role: 'Web developer',",
    "  skills: ['WordPress', 'Shopify', 'Webflow', 'React', 'PHP', 'JavaScript','Prestashop'],",
    "  experience: '6+ years',",
    "  projects: 60+,",
    "  focus: 'Building digital experiences',",
    "  passion: 'Clean code & innovation'",
    "};"
  ];

  // Inclinación 3D suave de la ventana de código según la posición del mouse
  const windowTransform = isSectionVisible && animateIn
    ? `rotateX(${tilt.y * -4}deg) rotateY(${tilt.x * 5}deg)`
    : 'rotateX(0deg) rotateY(0deg)';

  return (
    <section id="about" className="relative py-24 bg-ink-950 text-gray-100 overflow-hidden" ref={sectionRef}>
      <div className="aurora -left-40 top-20 h-[360px] w-[360px] bg-blue-600/60" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de la sección */}
        <div
          ref={headerRef}
          className={`text-center transition-all duration-700 ease-out mb-14
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-mono">
            <span className="text-lux">&lt;Sobre mí /&gt;</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            ¡Hola! Soy un desarrollador web especializado en la <b className="text-gray-100 font-semibold">creación de sitios a medida, robustos y de alto rendimiento</b> utilizando tecnologías modernas. Mi experiencia abarca desde la planificación y arquitectura hasta la implementación completa, asegurando soluciones escalables y seguras para una presencia online efectiva. Complemento mi expertise con principios de diseño <b className="text-gray-100 font-semibold">UX/UI para crear interfaces intuitivas y visualmente atractivas, y ofrezco consultoría SEO para optimizar la visibilidad</b> y el alcance de tu sitio web. ¡Conversemos sobre tus proyectos de desarrollo web!
          </p>
        </div>

        {/* Ventana de código */}
        <div
          ref={codeBlockContainerRef}
          className={`mx-auto max-w-4xl mb-16 transition-all duration-700 ease-out delay-200
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ perspective: '1100px' }}
        >
          <div
            className="rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(99,102,241,0.55)] overflow-hidden"
            style={{ transform: windowTransform, transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-gray-500">developer.js</span>
            </div>
            <pre className="m-0 overflow-x-auto p-5 sm:p-7 font-mono text-[13px] sm:text-sm md:text-base leading-7">
              <code>
                {codeLines.map((line, index) => (
                  <div key={index} className="flex whitespace-pre-wrap break-words">
                    <span className="select-none w-8 shrink-0 text-right pr-4 text-gray-600">{index + 1}</span>
                    <span className="min-w-0">{highlight(line)}</span>
                  </div>
                ))}
                <div className="flex">
                  <span className="select-none w-8 shrink-0 text-right pr-4 text-gray-600">{codeLines.length + 1}</span>
                  <span className="inline-block h-5 w-2 translate-y-1 bg-cyan-300 animate-caret" aria-hidden="true" />
                </div>
              </code>
            </pre>
          </div>
        </div>

        {/* Estadísticas (tarjetas) */}
        <div
          ref={statsContainerRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6
                      transition-all duration-700 ease-out delay-300
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {stats.map((item) => (
            <div key={item.title} className="spotlight glass rounded-2xl p-7">
              <h3 className="text-xl font-bold text-lux mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
              <div className="mt-6 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 transition-all duration-1000 ease-out"
                  style={{ width: animateIn ? '100%' : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
