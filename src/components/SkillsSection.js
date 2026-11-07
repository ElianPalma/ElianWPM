import React, { useState, useEffect, useRef } from 'react'; // Importa useState, useEffect, y useRef

// Habilidades agrupadas como en el CV. Si una tecnología ya tenía un nivel en el portafolio, se conserva (level).
const skillGroups = [
  {
    title: 'Frontend y Mobile',
    items: [
      { name: 'React.js', level: 80 }, { name: 'React Native' }, { name: 'Flutter' }, { name: 'Dart' }, { name: 'Expo SDK' },
      { name: 'JavaScript', level: 90 }, { name: 'ECMAScript', level: 90 }, { name: 'TypeScript' }, { name: 'Vue.js', level: 85 },
      { name: 'Angular.js', level: 75 }, { name: 'Three.js', level: 70 }, { name: 'HTML5', level: 100 }, { name: 'CSS', level: 95 },
      { name: 'Bootstrap', level: 92 },
    ],
  },
  {
    title: 'Backend, Infra y CLI',
    items: [
      { name: 'Node.js' }, { name: 'GraphQL' }, { name: 'Terminal / CLI' }, { name: 'Git', level: 90 }, { name: 'GitHub' },
      { name: 'Docker' }, { name: 'PHP', level: 88 }, { name: 'Laravel', level: 70 }, { name: 'MySQL', level: 85 },
      { name: 'Supabase' }, { name: 'Gestión de Hosting y Dominio' },
    ],
  },
  {
    title: 'CMS y E-commerce',
    items: [
      { name: 'Shopify', level: 95 }, { name: 'Liquid' }, { name: 'WordPress', level: 100 }, { name: 'WooCommerce', level: 100 },
      { name: 'Flatsome' }, { name: 'Prestashop', level: 85 }, { name: 'Magento', level: 80 }, { name: 'Recharge' }, { name: 'Stripe' },
      { name: 'Liferay', level: 79 }, { name: 'Webflow', level: 90 }, { name: 'Drupal', level: 80 }, { name: 'Kajabi' },
      { name: 'LearnDash', level: 90 }, { name: 'Elementor', level: 95 }, { name: 'Divi', level: 95 }, { name: 'WPBakery', level: 85 },
    ],
  },
  {
    title: 'UX/UI y Analytics',
    items: [
      { name: 'Figma', level: 88 }, { name: 'Adobe Photoshop', level: 50 }, { name: 'Illustrator', level: 50 },
      { name: 'Google Tag Manager (Server Side)', level: 78 }, { name: 'Google Analytics 4', level: 82 }, { name: 'Google ADS', level: 75 },
      { name: 'SEO Orgánico', level: 88 }, { name: 'Yoast SEO', level: 95 }, { name: 'Make' }, { name: 'Airtable' },
      { name: 'Notion' }, { name: 'TimelinesAI' },
    ],
  },
];

const SkillsSection = () => {
  // Estado para controlar la animación de entrada de la sección y las tarjetas
  const [animateIn, setAnimateIn] = useState(false);

  // Refs para observar los elementos principales
  const headerRef = useRef(null); // Para el título y la descripción
  const skillsGridRef = useRef(null); // Para el contenedor de la cuadrícula de habilidades

  // useEffect para el IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // El viewport es el elemento raíz
      rootMargin: '0px',
      threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    };

    // Crear un observador para el encabezado de la sección o la cuadrícula
    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateIn(true); // Activa la animación general de la sección y las tarjetas
          mainObserver.unobserve(entry.target); // Dejar de observar una vez que se hizo visible
        }
      });
    }, observerOptions);

    // Adjuntar observador a los elementos. Podemos observar el encabezado o la cuadrícula,
    // dependiendo de qué elemento definirá el inicio de la animación de la sección.
    // Observar el header para que la animación empiece cuando se vea el título.
    if (headerRef.current) mainObserver.observe(headerRef.current);
    // Si quieres que empiece cuando la cuadrícula es visible, puedes observar skillsGridRef.current

    // Función de limpieza para desconectar el observador
    return () => {
      if (headerRef.current) mainObserver.unobserve(headerRef.current);
      mainObserver.disconnect();
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <section id="skills" className="relative py-24 bg-ink-950 overflow-hidden">
      <div className="aurora -left-40 bottom-10 h-[360px] w-[360px] bg-cyan-600/50" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de la sección de habilidades */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Mis <span className="text-lux">Habilidades</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino y disfruto utilizando.
          </p>
        </div>

        {/* Grupos de habilidades */}
        <div
          ref={skillsGridRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto
                      transition-all duration-700 ease-out delay-200
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.title}
              className="spotlight glass rounded-2xl p-6 sm:p-7"
              style={{
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(24px)',
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                transitionDelay: animateIn ? `${gi * 120}ms` : '0ms',
              }}
            >
              <h3 className="text-lg font-bold text-lux mb-5">{group.title}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-gray-200 transition-colors hover:border-violet-400/60 hover:bg-white/[0.08]"
                  >
                    {skill.name}
                    {skill.level && <span className="font-mono text-xs text-cyan-300">{skill.level}%</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;