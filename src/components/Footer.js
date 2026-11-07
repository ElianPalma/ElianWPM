import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-ink-950 text-gray-400 py-12">
      <div className="section-line absolute inset-x-0 top-0" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold text-white tracking-tight">
              <span className="text-lux">Portafolio</span> Elian
            </p>
            <p className="mt-2 text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/elian-wilfredo-palma-mu%C3%B1oz-237809186/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Elian Palma"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.8)]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
