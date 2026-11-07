import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import projects from '../mock/projects';

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [animateIn, setAnimateIn] = useState(false);

  const projectsPerPage = 6;
  const categories = ['Todos', 'Wordpress', 'Shopify', 'Webflow', 'Prestashop'];

  const headerRef = useRef(null);
  const projectGridRef = useRef(null);
  const paginationRef = useRef(null);

  // Lógica de filtrado: busca la categoría dentro de los tags de cada proyecto
  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter(project =>
        project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  // Cálculo de paginación basado en la lista filtrada
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Función para cambiar de filtro y resetear a la página 1
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  // Cambiar de página y volver al inicio de la sección de proyectos
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const section = document.getElementById('projects');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 overflow-hidden">
      <div className="aurora -right-40 top-40 h-[380px] w-[380px] bg-violet-700/60" />
      <div className="container mx-auto px-6 relative z-10">

        {/* Encabezado */}
        <div
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 ease-out
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Mis <span className="text-lux">Proyectos</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Desarrollo <b className="text-gray-100 font-semibold">landing pages, sitios web, e-commerce y academias online</b>.
          </p>
        </div>

        {/* Filtros */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          role="group"
          aria-label="Filtrar proyectos por tecnología"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              aria-pressed={activeFilter === cat}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === cat
                  ? 'border-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.9)] scale-105'
                  : 'border-white/10 bg-white/[0.04] text-gray-400 hover:border-blue-400/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cuadrícula de proyectos */}
        <div
          ref={projectGridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12
                      transition-all duration-700 ease-out delay-200
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mensaje de no resultados */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 py-10">No se encontraron proyectos en esta categoría.</p>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div
            ref={paginationRef}
            className={`transition-all duration-700 ease-out delay-300
                        ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
