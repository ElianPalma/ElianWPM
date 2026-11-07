import React, { useState, useEffect } from 'react';
// Importamos el nuevo icono de descarga (ArrowDownTrayIcon)
import { DocumentArrowDownIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
// Importa el PDF directamente
import pdfCV from './img/Elian CV 2026.pdf';

const navLinks = [
  { href: '#projects', label: 'Proyectos' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#contact', label: 'Contacto' },
];

const PortfolioHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    if (!showModal) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setShowModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para abrir/cerrar modal
  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-ink-950/75 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Barra de progreso de lectura */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="#top" className="text-2xl md:text-[1.7rem] font-semibold tracking-tight text-white" aria-label="Elian Palma, inicio">
              Elian<span className="text-lux">Palma</span>
            </a>

            <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              {/* Botón ajustado para abrir modal */}
              <button onClick={toggleModal} className="btn-lux btn-lux-sm">
                <DocumentArrowDownIcon className="w-4 h-4" />
                Currículum
              </button>
            </nav>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-200"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 glass rounded-2xl p-5 space-y-1 animate-fade-up">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-3 text-gray-200 hover:bg-white/5 hover:text-white font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { toggleModal(); toggleMenu(); }}
                className="btn-lux w-full mt-3"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Currículum
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MODAL DEL PDF */}
      {showModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Currículum Vitae"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="relative w-full max-w-5xl h-[90vh] bg-ink-800 rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.45)] overflow-hidden flex flex-col">
            {/* Barra superior del modal */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-ink-900">
              <h3 className="text-white font-medium text-sm sm:text-base">Currículum Vitae - Elian Palma</h3>

              <div className="flex items-center gap-2">
                <a
                  href={pdfCV}
                  download="Elian_CV_2026.pdf" // Nombre con el que se descargará
                  title="Descargar CV"
                  className="text-gray-400 hover:text-cyan-300 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                </a>

                <button
                  onClick={toggleModal}
                  title="Cerrar"
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                >
                  <XMarkIcon className="w-7 h-7" />
                </button>
              </div>
            </div>

            {/* Contenedor del PDF */}
            <div className="flex-1 w-full bg-white">
              <iframe
                src={`${pdfCV}#toolbar=0`}
                className="w-full h-full"
                title="PDF CV"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioHeader;
