import React, { useState } from 'react';

const MAX_VISIBLE_TAGS = 6;
// Altura visible de la captura dentro de la tarjeta (en px, = h-64)
const VIEWPORT_H = 256;

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch (e) {
    return url;
  }
};

const ProjectCard = ({ project }) => {
  // Duración del "scroll automático" de la captura según lo larga que sea la página
  const [scrollMs, setScrollMs] = useState(6000);

  const handleImageLoad = (e) => {
    const rendered = e.currentTarget.clientHeight;
    const distance = Math.max(0, rendered - VIEWPORT_H);
    // ~110 px por segundo, entre 3 y 16 segundos
    setScrollMs(Math.min(16000, Math.max(3000, (distance / 110) * 1000)));
  };

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = project.tags.slice(MAX_VISIBLE_TAGS);

  return (
    <article className="spotlight glass group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1.5">
      {/* Marco de navegador con la captura de la web (clic = abre el sitio) */}
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir el sitio web de ${project.title}`}
        className="relative block cursor-pointer"
        data-cursor-hover="link"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-ink-900/90 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 truncate rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-gray-400">
            {getDomain(project.demoUrl)}
          </span>
        </div>

        <div className="relative h-64 overflow-hidden bg-ink-800">
          <img
            src={project.image}
            alt={`Captura del sitio web ${project.title}`}
            className="project-shot block w-full h-auto"
            style={{ '--scroll-ms': `${scrollMs}ms` }}
            loading="lazy"
            onLoad={handleImageLoad}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-900/70 to-transparent" />
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight text-white">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-lux transition-colors">
            {project.title}
          </a>
        </h3>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{project.description}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200"
            >
              {tag}
            </span>
          ))}
          {hiddenTags.length > 0 && (
            <span
              title={hiddenTags.join(', ')}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400"
            >
              +{hiddenTags.length}
            </span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-lux-sm w-full"
            data-cursor-hover="link"
          >
            Demostración
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
