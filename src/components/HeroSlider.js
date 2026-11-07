import React, { useState, useEffect } from 'react';
import imgslider1 from './img/software.jpg';
import imgslider2 from './img/diseñoweb.jpg';
import imgslider3 from './img/SEO.jpg';

const heroSlides = [
  {
    id: 1,
    title: "Desarrollador Web Full Stack",
    subtitle: "Especializado en WordPress y E-commerce",
    description: "Creación de sitios web a medida con las últimas tecnologías y enfoque en resultados.",
    image: imgslider1,
    ctaText: "Ver mis proyectos",
    ctaLink: "#projects"
  },
  {
    id: 2,
    title: "Experto en UX/UI",
    subtitle: "Diseño centrado en el usuario",
    description: "Interfaces intuitivas que mejoran la experiencia y conversión de tus clientes.",
    image: imgslider2,
    ctaText: "Conoce mis habilidades",
    ctaLink: "#skills"
  },
  {
    id: 3,
    title: "Consultor SEO y Marketing Digital",
    subtitle: "Posicionamiento y visibilidad online",
    description: "Estrategias personalizadas para aumentar el tráfico cualificado a tu sitio web.",
    image: imgslider3,
    ctaText: "Contáctame ahora",
    ctaLink: "#contact"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransition(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        setTransition(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setTransition(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setTransition(true);
    }, 500);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section id="top" className="relative min-h-[640px] h-screen max-h-[860px] overflow-hidden bg-ink-950">
      {/* Imágenes de fondo */}
      <div className="absolute inset-0">
        {heroSlides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide && transition ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover scale-105"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Capas de atmósfera: oscurecido, aurora y rejilla */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />
      <div className="aurora animate-float-slow -top-32 -left-24 h-[420px] w-[420px] bg-violet-600" />
      <div className="aurora animate-float-slow top-1/3 -right-24 h-[380px] w-[380px] bg-cyan-500/70" style={{ animationDelay: '-6s' }} />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      {/* Contenido */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-3xl transition-all duration-700 ${transition ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-5">
              {slide.title}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-lux mb-6">
              {slide.subtitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              {slide.description}
            </p>
            <a href={slide.ctaLink} className="btn-lux text-base" data-cursor-hover="button">
              {slide.ctaText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Indicadores con barra de progreso */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-6 flex items-center gap-3">
          {heroSlides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              className="group relative h-6 w-14 sm:w-20 flex items-center"
              aria-label={`Ir a slide ${index + 1}`}
              aria-current={index === currentSlide}
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/20">
                {index === currentSlide && (
                  <span
                    key={`${currentSlide}-${transition}`}
                    className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 animate-slide-progress"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

// DONE
